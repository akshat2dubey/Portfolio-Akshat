import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useSupportsWebGL } from "../../hooks/useWebGL";
import { makeGlowTexture, SCENE_COLORS } from "./palette";

interface CurveSpec {
  points: THREE.Vector3[];
}

interface Packet {
  obj: THREE.Sprite;
  curve: CurveSpec;
  t: number;
  dir: 1 | -1;
  speed: number;
}

interface Pulse {
  obj: THREE.Sprite;
  seed: number;
}

function useTopology(lowEnd: boolean) {
  return useMemo(() => {
    const rows = lowEnd ? 3 : 5;
    const cols = lowEnd ? 3 : 4;
    const nodes: THREE.Vector3[] = [];
    const nodeColors: THREE.Color[] = [];
    const hues = SCENE_COLORS.nodeHues;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c - (cols - 1) / 2) * 2.7 + (Math.random() - 0.5) * 0.7;
        const y = ((rows - 1) / 2 - r) * 1.3 + (Math.random() - 0.5) * 0.4;
        const z = (Math.random() - 0.5) * 1.4;
        nodes.push(new THREE.Vector3(x, y, z));
        const tint = hues[(r + c) % hues.length];
        nodeColors.push(new THREE.Color().setHSL(tint.h, tint.s, tint.l));
      }
    }

    // Curved data paths between adjacent layers (vertical "traffic").
    const curves: CurveSpec[] = [];
    const samples = 48;
    for (let r = 0; r < rows - 1; r++) {
      for (let c = 0; c < cols; c++) {
        const a = nodes[r * cols + c];
        // Pick the nearest node in the row below for a natural edge.
        let best = r * cols + cols;
        let bestD = Infinity;
        for (let cc = 0; cc < cols; cc++) {
          const b = nodes[(r + 1) * cols + cc];
          const d = Math.abs(a.x - b.x) + Math.abs(a.z - b.z);
          if (d < bestD) {
            bestD = d;
            best = (r + 1) * cols + cc;
          }
        }
        const b = nodes[best];
        // Quadratic bezier with a gentle bulge forward in z.
        const mid = new THREE.Vector3(
          (a.x + b.x) / 2 + (Math.random() - 0.5) * 0.5,
          (a.y + b.y) / 2,
          Math.min(a.z, b.z) - 1.1 - Math.random() * 0.8,
        );
        const curve = new THREE.QuadraticBezierCurve3(a.clone(), mid, b.clone());
        const pts: THREE.Vector3[] = [];
        for (let i = 0; i <= samples; i++) {
          pts.push(curve.getPoint(i / samples));
        }
        curves.push({ points: pts });
      }
    }
    return { nodes, nodeColors, curves };
  }, [lowEnd]);
}

function Topology({ reduced, lowEnd }: { reduced: boolean; lowEnd: boolean }) {
  const { nodes, nodeColors, curves } = useTopology(lowEnd);
  const glow = useMemo(makeGlowTexture, []);
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const aspectScale = Math.min(1.5, Math.max(0.55, viewport.width / 11));
  const ringRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = e.clientX / window.innerWidth - 0.5;
      pointer.current.y = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // Travelling data packets along the curves.
  const packets = useMemo(() => {
    if (reduced) return [];
    const n = lowEnd ? 4 : 8;
    const out: Packet[] = [];
    const mat = new THREE.SpriteMaterial({
      map: glow,
      color: new THREE.Color("#7df3ff"),
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    for (let i = 0; i < n; i++) {
      const curve = curves[Math.floor(Math.random() * curves.length)];
      const sprite = new THREE.Sprite(mat.clone());
      sprite.scale.setScalar(0.14 + Math.random() * 0.08);
      out.push({
        obj: sprite,
        curve,
        t: Math.random(),
        dir: Math.random() < 0.5 ? 1 : -1,
        speed: 0.22 + Math.random() * 0.3,
      });
    }
    return out;
  }, [glow, reduced, lowEnd, curves]);

  // Pulsing "security monitor" rings on a few nodes.
  const pulses = useMemo(() => {
    const out: Pulse[] = [];
    const mat = new THREE.SpriteMaterial({
      map: glow,
      color: SCENE_COLORS.cyanSoft,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    for (let i = 0; i < nodes.length; i++) {
      if (i % 4 !== 0) continue;
      const sprite = new THREE.Sprite(mat.clone());
      sprite.position.copy(nodes[i]);
      // Base scale so the pulse reads as a static ring under reduced motion.
      sprite.scale.setScalar(0.35);
      out.push({ obj: sprite, seed: i * 1.7 });
    }
    return out;
  }, [glow, nodes]);

  // Node glow sprites.
  const nodeSprites = useMemo(() => {
    const mat = new THREE.SpriteMaterial({
      map: glow,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: false,
    });
    return nodes.map((p, i) => {
      const sprite = new THREE.Sprite(mat.clone());
      sprite.position.copy(p);
      sprite.scale.setScalar((lowEnd ? 0.32 : 0.24) + Math.random() * 0.08);
      (sprite.material as THREE.SpriteMaterial).color.copy(nodeColors[i]);
      return sprite;
    });
  }, [glow, lowEnd, nodes, nodeColors]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;

    if (!reduced) {
      const t = state.clock.getElapsedTime();

      // Slow autonomous rotation + faint pointer parallax.
      g.rotation.y += delta * 0.03;
      g.rotation.y += (pointer.current.x * 0.3 - g.rotation.y) * delta * 0.7;
      g.rotation.x += (pointer.current.y * -0.14 - g.rotation.x) * delta * 0.7;

      for (const p of packets) {
        p.t += delta * p.speed * p.dir;
        if (p.t >= 1) {
          p.t = 1;
          p.dir = -1;
        } else if (p.t <= 0) {
          p.t = 0;
          p.dir = 1;
        }
        const idx = p.t * (p.curve.points.length - 1);
        const i0 = Math.min(Math.floor(idx), p.curve.points.length - 2);
        const frac = idx - i0;
        p.obj.position.lerpVectors(p.curve.points[i0], p.curve.points[i0 + 1], frac);
      }

      for (const pulse of pulses) {
        const s = 0.35 + Math.sin(t * 1.6 + pulse.seed) * 0.22;
        pulse.obj.scale.setScalar(Math.max(0.1, s));
        (pulse.obj.material as THREE.SpriteMaterial).opacity = 0.35 + Math.sin(t * 1.6 + pulse.seed) * 0.25;
      }

      if (ringRef.current) {
        ringRef.current.rotation.z += delta * 0.06;
        ringRef.current.rotation.x += delta * 0.03;
      }
      if (coreRef.current) {
        coreRef.current.rotation.y += delta * 0.18;
        coreRef.current.rotation.x += delta * 0.06;
      }
    }
  });

  return (
    <group ref={group} scale={[aspectScale, 1, 1]}>
      {/* Node sprites */}
      {nodeSprites.map((s, i) => (
        <primitive key={i} object={s} />
      ))}

      {/* Curved data paths */}
      {curves.map((c, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array(c.points.flatMap((p) => [p.x, p.y, p.z])), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color={SCENE_COLORS.blue}
            transparent
            opacity={lowEnd ? 0.16 : 0.2}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </line>
      ))}

      {/* Packets travelling along the paths */}
      {packets.map((p, i) => (
        <primitive key={i} object={p.obj} />
      ))}

      {/* Security-monitor pulses */}
      {pulses.map((p, i) => (
        <primitive key={`pulse-${i}`} object={p.obj} />
      ))}

      {/* Core: wireframe security crystal + orbit ring */}
      <mesh ref={coreRef} position={[0, 0, 1.6]}>
        <icosahedronGeometry args={[0.8, 1]} />
        <meshBasicMaterial color={SCENE_COLORS.cyan} wireframe transparent opacity={0.5} />
      </mesh>
      <mesh ref={ringRef} position={[0, 0, 1.6]}>
        <torusGeometry args={[1.5, 0.008, 8, 90]} />
        <meshBasicMaterial color={SCENE_COLORS.cyanSoft} transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

export default function SecureBankScene() {
  const supports = useSupportsWebGL();
  const isMobile = useIsMobile();
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lowEnd =
    isMobile ||
    (typeof navigator !== "undefined" && (navigator.hardwareConcurrency ?? 8) <= 4);

  const [visible, setVisible] = useState(true);

  // Pause rendering while the section is off-screen.
  useEffect(() => {
    const el = document.getElementById("securebank");
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.02,
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  if (!supports) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Sticky viewport-height stage: the scene stays behind the section
          content as the whole (very tall) section scrolls, without paying
          for a canvas the size of the entire section. */}
      <div className="sticky top-0 h-screen">
        <Canvas
          frameloop={visible ? (reduced ? "demand" : "always") : "demand"}
          dpr={isMobile ? [1, 1.5] : [1, 2]}
          camera={{ position: [0, 0.5, 9.5], fov: 46 }}
          gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }}
          style={{ background: "transparent" }}
        >
          <Topology reduced={reduced} lowEnd={lowEnd} />
        </Canvas>
      </div>
    </div>
  );
}
