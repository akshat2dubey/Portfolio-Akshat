import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useSupportsWebGL } from "../../hooks/useWebGL";
import { makeGlowTexture, SCENE_COLORS } from "./palette";

/** Subtle accent hue per section — shifts the field's living edges as you scroll. */
const SECTION_ACCENTS: Record<string, THREE.Color> = {
  about: SCENE_COLORS.blue,
  skills: SCENE_COLORS.cyan,
  projects: SCENE_COLORS.cyanSoft,
  securebank: SCENE_COLORS.cyanSoft,
  journey: SCENE_COLORS.violet,
  milestones: SCENE_COLORS.violet,
  contact: SCENE_COLORS.cyan,
};

const GRID_TINT = new THREE.Color(0x39506e);

interface FieldProps {
  section: string;
  reduced: boolean;
  lowEnd: boolean;
  scrollRef: RefObject<number>;
}

interface Packet {
  obj: THREE.Sprite;
  seed: number;
  speed: number;
}

interface ShapeSpec {
  geometry: THREE.BufferGeometry;
  color: THREE.Color;
  position: [number, number, number];
  speed: number;
}

/** Builds the static node cloud + edges once (stable / living groups). */
function useFieldData(count: number) {
  return useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Wide, shallow cloud so the field reads as an environment, not a ball.
      const r = 6.8 * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.52;
      positions[i * 3 + 2] = r * Math.cos(phi) * 0.6 - 0.6;
    }

    // Edges split into a stable set and two "living" sets whose opacity
    // breathes — connections appearing and disappearing over time.
    const maxEdges = count * 2.0;
    const stable: number[] = [];
    const livingA: number[] = [];
    const livingB: number[] = [];
    let added = 0;
    for (let a = 0; a < count && added < maxEdges; a++) {
      for (let b = a + 1; b < count; b++) {
        const ax = positions[a * 3], ay = positions[a * 3 + 1], az = positions[a * 3 + 2];
        const bx = positions[b * 3], by = positions[b * 3 + 1], bz = positions[b * 3 + 2];
        const dx = ax - bx, dy = ay - by, dz = az - bz;
        const d2 = dx * dx + dy * dy + dz * dz;
        if (d2 < 9.5) {
          const roll = Math.random();
          const target = roll < 0.55 ? stable : roll < 0.78 ? livingA : livingB;
          target.push(ax, ay, az, bx, by, bz);
          added++;
          if (added >= maxEdges) break;
        }
      }
    }

    return {
      positions,
      stable: new Float32Array(stable),
      livingA: new Float32Array(livingA),
      livingB: new Float32Array(livingB),
    };
  }, [count]);
}

function FloatingShape({
  spec,
  reduced,
}: {
  spec: ShapeSpec;
  reduced: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (reduced || !ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x += delta * spec.speed * 0.12;
    ref.current.rotation.y += delta * spec.speed * 0.16;
    ref.current.position.y += Math.sin(t * 0.4 + spec.position[0]) * delta * 0.04;
  });
  return (
    <mesh ref={ref} position={spec.position}>
      <primitive object={spec.geometry} attach="geometry" />
      <meshBasicMaterial color={spec.color} wireframe transparent opacity={0.14} />
    </mesh>
  );
}

function Field({ section, reduced, lowEnd, scrollRef }: FieldProps) {
  const { positions, stable, livingA, livingB } = useFieldData(lowEnd ? 46 : 108);
  const glow = useMemo(makeGlowTexture, []);
  const { viewport } = useThree();

  // Widen/narrow the field to match the viewport aspect so it always fills
  // the screen — wide on desktop, tighter on portrait mobile.
  const aspectScale = Math.min(1.5, Math.max(0.55, viewport.width / 10));
  const group = useRef<THREE.Group>(null);
  const accentRef = useRef(SCENE_COLORS.cyan.clone());
  const matLivingA = useRef<THREE.LineBasicMaterial>(null);
  const matLivingB = useRef<THREE.LineBasicMaterial>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  const target = SECTION_ACCENTS[section] ?? SCENE_COLORS.cyan;

  // Global pointer parallax — the fixed canvas can't receive pointer events,
  // so track the cursor at window level (works with pointer-events: none).
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = e.clientX / window.innerWidth - 0.5;
      pointer.current.y = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // Node point colors — cyan/blue/violet family from the theme.
  const pointColors = useMemo(() => {
    const cols = new Float32Array(positions.length);
    const c = new THREE.Color();
    for (let i = 0; i < positions.length / 3; i++) {
      const tint = SCENE_COLORS.nodeHues[i % SCENE_COLORS.nodeHues.length];
      c.setHSL(tint.h, tint.s, tint.l);
      cols[i * 3] = c.r;
      cols[i * 3 + 1] = c.g;
      cols[i * 3 + 2] = c.b;
    }
    return cols;
  }, [positions]);

  // Slowly drifting dust particles.
  const packets = useMemo(() => {
    const n = lowEnd ? 12 : 34;
    const out: Packet[] = [];
    const mat = new THREE.SpriteMaterial({
      map: glow,
      color: SCENE_COLORS.cyanSoft,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    for (let i = 0; i < n; i++) {
      const sprite = new THREE.Sprite(mat.clone());
      const scale = 0.05 + Math.random() * 0.09;
      sprite.scale.setScalar(scale);
      sprite.position.set(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 9,
        (Math.random() - 0.5) * 5,
      );
      out.push({ obj: sprite, seed: Math.random() * Math.PI * 2, speed: 0.25 + Math.random() * 0.4 });
    }
    return out;
  }, [glow, lowEnd]);

  // Wireframe geometries — always the same call count regardless of lowEnd.
  const shapes = useMemo<ShapeSpec[]>(() => {
    const list: ShapeSpec[] = [
      {
        geometry: new THREE.IcosahedronGeometry(0.85, 1),
        color: SCENE_COLORS.cyan,
        position: [4.6, 2.3, -2],
        speed: 1,
      },
    ];
    if (!lowEnd) {
      list.push(
        {
          geometry: new THREE.OctahedronGeometry(0.62, 0),
          color: SCENE_COLORS.blue,
          position: [-4.6, -1.8, -2.6],
          speed: 1.4,
        },
        {
          geometry: new THREE.TorusGeometry(1.15, 0.012, 6, 60),
          color: SCENE_COLORS.violet,
          position: [5.6, -2.6, -3.2],
          speed: 0.8,
        },
      );
    }
    return list;
  }, [lowEnd]);

  const grid = useMemo(() => {
    const g = new THREE.GridHelper(48, 48, SCENE_COLORS.night, GRID_TINT);
    (g.material as THREE.LineBasicMaterial).transparent = true;
    (g.material as THREE.LineBasicMaterial).opacity = 0.16;
    g.position.y = -3.4;
    return g;
  }, []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;

    // Accent hue slowly travels toward the current section's color.
    accentRef.current.lerp(target, Math.min(1, delta * 1.6));

    if (reduced) return;

    const t = state.clock.getElapsedTime();

    // Living edges — connections fade in/out independently.
    if (matLivingA.current) {
      matLivingA.current.color.copy(accentRef.current);
      matLivingA.current.opacity = 0.16 + Math.sin(t * 0.5) * 0.1;
    }
    if (matLivingB.current) {
      matLivingB.current.color.copy(accentRef.current).multiplyScalar(0.85);
      matLivingB.current.opacity = 0.12 + Math.sin(t * 0.34 + 2.2) * 0.08;
    }

    // Gentle scroll-driven undulation — the field breathes as the user moves,
    // always returning near center so it never drifts off-screen.
    const scroll = scrollRef.current ?? 0;
    g.position.y = Math.sin(scroll * 0.0016) * 0.55;
    g.rotation.z = Math.sin(scroll * 0.0009) * 0.02;

    // Slow autonomous motion + faint pointer parallax.
    g.rotation.y += delta * 0.02;
    g.rotation.y += (pointer.current.x * 0.22 - g.rotation.y) * delta * 0.6;
    g.rotation.x += (pointer.current.y * -0.1 - g.rotation.x) * delta * 0.6;

    // Dust particles drifting slowly upward with a gentle sway.
    const pg = particlesRef.current;
    if (pg) {
      for (const p of packets) {
        p.obj.position.y += delta * p.speed * 0.18;
        p.obj.position.x += Math.sin(t * 0.3 + p.seed) * delta * 0.03;
        if (p.obj.position.y > 4.6) p.obj.position.y = -4.6;
      }
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.05;
      ringRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <group ref={group} scale={[aspectScale, 1, 1]}>
      {/* Faint technical grid floor for depth */}
      <primitive object={grid} />

      {/* Nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[pointColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          map={glow}
          size={lowEnd ? 0.11 : 0.14}
          vertexColors
          transparent
          opacity={0.75}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>

      {/* Stable edges */}
      {stable.length > 0 && (
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[stable, 3]} />
          </bufferGeometry>
          <lineBasicMaterial
            color={SCENE_COLORS.cyan}
            transparent
            opacity={0.16}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>
      )}

      {/* Living edges — breathing connections */}
      {livingA.length > 0 && (
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[livingA, 3]} />
          </bufferGeometry>
          <lineBasicMaterial
            ref={matLivingA}
            color={SCENE_COLORS.cyan}
            transparent
            opacity={0.16}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>
      )}
      {livingB.length > 0 && (
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[livingB, 3]} />
          </bufferGeometry>
          <lineBasicMaterial
            ref={matLivingB}
            color={SCENE_COLORS.cyan}
            transparent
            opacity={0.12}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>
      )}

      {/* Drifting dust */}
      <group ref={particlesRef}>
        {packets.map((p, i) => (
          <primitive key={i} object={p.obj} />
        ))}
      </group>

      {/* Wireframe geometries — slow, sparse */}
      {shapes.map((spec, i) => (
        <FloatingShape key={i} spec={spec} reduced={reduced} />
      ))}

      {/* Floating ring — picks up the section accent */}
      <mesh ref={ringRef} position={[-5.8, 2.4, -4]}>
        <torusGeometry args={[1.9, 0.008, 8, 90]} />
        <meshBasicMaterial color={SCENE_COLORS.cyan} transparent opacity={0.14} />
      </mesh>
    </group>
  );
}

export default function AmbientScene({ section }: { section: string }) {
  const supports = useSupportsWebGL();
  const isMobile = useIsMobile();
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lowEnd =
    isMobile ||
    (typeof navigator !== "undefined" && (navigator.hardwareConcurrency ?? 8) <= 4);

  const [visible, setVisible] = useState(true);
  const scrollRef = useRef(0);

  // Fade in after the hero — its own scene owns the first viewport.
  const { scrollY } = useScroll();
  const fade = useTransform(scrollY, (v) => {
    const vh = typeof window !== "undefined" ? window.innerHeight : 800;
    return Math.min(1, Math.max(0, (v - vh * 0.22) / (vh * 0.9)));
  });
  useMotionValueEvent(scrollY, "change", (v) => {
    scrollRef.current = v;
  });

  // Pause rendering when the tab is hidden.
  useEffect(() => {
    const onVis = () => setVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  if (!supports) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: fade }}
    >
      <Canvas
        frameloop={visible ? (reduced ? "demand" : "always") : "demand"}
        dpr={isMobile ? [1, 1.4] : [1, 1.75]}
        camera={{ position: [0, 0.7, 8.6], fov: 48 }}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Field section={section} reduced={reduced} lowEnd={lowEnd} scrollRef={scrollRef} />
      </Canvas>
    </motion.div>
  );
}
