import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useIsMobile } from "../../hooks/useIsMobile";

/** Canvas radial-gradient sprite for soft glowing particles. */
function makeGlowTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.25, "rgba(160,235,255,0.85)");
  g.addColorStop(1, "rgba(34,211,238,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

interface NetworkProps {
  count: number;
  reduced: boolean;
}

/** Generates the node positions and edge list once. */
function useNetworkData(count: number) {
  return useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distribute nodes in a squashed sphere so the field reads like a network cloud.
      const r = 4.6 * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.62;
      positions[i * 3 + 2] = r * Math.cos(phi) * 0.85;
    }

    // Edges: connect close pairs, capped for perf.
    const maxEdges = count * 2.1;
    const linePos: number[] = [];
    const lineCol: number[] = [];
    const c = new THREE.Color();
    for (let a = 0; a < count && linePos.length / 6 < maxEdges; a++) {
      for (let b = a + 1; b < count; b++) {
        const ax = positions[a * 3], ay = positions[a * 3 + 1], az = positions[a * 3 + 2];
        const bx = positions[b * 3], by = positions[b * 3 + 1], bz = positions[b * 3 + 2];
        const dx = ax - bx, dy = ay - by, dz = az - bz;
        const d2 = dx * dx + dy * dy + dz * dz;
        if (d2 < 6.5) {
          const d = Math.sqrt(d2);
          linePos.push(ax, ay, az, bx, by, bz);
          const fade = Math.max(0, 1 - d / 3.2);
          c.setHSL(0.52 + fade * 0.06, 0.9, 0.55);
          lineCol.push(c.r * fade, c.g * fade, c.b * fade);
          lineCol.push(c.r * fade, c.g * fade, c.b * fade);
          if (linePos.length / 6 >= maxEdges) break;
        }
      }
    }
    return {
      positions,
      edges: new Float32Array(linePos),
      edgeColors: new Float32Array(lineCol),
    };
  }, [count]);
}

function Network({ count, reduced }: NetworkProps) {
  const { positions, edges, edgeColors } = useNetworkData(count);
  const glow = useMemo(makeGlowTexture, []);
  const group = useRef<THREE.Group>(null);
  const packets = useRef<
    { a: THREE.Vector3; b: THREE.Vector3; t: number; speed: number; obj: THREE.Sprite }[]
  >([]);
  const { pointer } = useThree();

  // Node points with per-vertex color variation.
  const pointColors = useMemo(() => {
    const cols = new Float32Array(count * 3);
    const c = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const tint = Math.random();
      if (tint < 0.55) c.setHSL(0.5, 0.95, 0.62 + Math.random() * 0.18);
      else if (tint < 0.8) c.setHSL(0.62, 0.85, 0.65);
      else c.setHSL(0.72, 0.8, 0.7);
      cols[i * 3] = c.r;
      cols[i * 3 + 1] = c.g;
      cols[i * 3 + 2] = c.b;
    }
    return cols;
  }, [count]);

  // Data packets travelling along random edges.
  const packetSprites = useMemo(() => {
    if (reduced || edges.length === 0) return [];
    const geo = new THREE.SpriteMaterial({
      map: glow,
      color: new THREE.Color("#7df3ff"),
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const sprites: { obj: THREE.Sprite; mat: THREE.SpriteMaterial }[] = [];
    const edgeCount = edges.length / 6;
    const n = Math.min(7, Math.floor(edgeCount / 4));
    for (let i = 0; i < n; i++) {
      const idx = Math.floor(Math.random() * edgeCount) * 6;
      const a = new THREE.Vector3(edges[idx], edges[idx + 1], edges[idx + 2]);
      const b = new THREE.Vector3(edges[idx + 3], edges[idx + 4], edges[idx + 5]);
      const mat = geo.clone();
      const sprite = new THREE.Sprite(mat);
      sprite.scale.setScalar(0.16 + Math.random() * 0.1);
      packets.current.push({ a, b, t: Math.random(), speed: 0.25 + Math.random() * 0.35, obj: sprite });
      sprites.push({ obj: sprite, mat });
    }
    return sprites;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, reduced]);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;

    // Slow autonomous rotation + subtle pointer parallax.
    const targetY = pointer.x * 0.35;
    const targetX = pointer.y * -0.18;
    g.rotation.y += delta * 0.045;
    g.rotation.y += (targetY - g.rotation.y) * delta * 0.9;
    g.rotation.x += (targetX - g.rotation.x) * delta * 0.9;

    if (reduced) return;

    for (const p of packets.current) {
      p.t += delta * p.speed;
      if (p.t >= 1) {
        p.t = 0;
        // Pick a new edge to hop onto.
        const edgeCount = edges.length / 6;
        const idx = Math.floor(Math.random() * edgeCount) * 6;
        p.a.set(edges[idx], edges[idx + 1], edges[idx + 2]);
        p.b.set(edges[idx + 3], edges[idx + 4], edges[idx + 5]);
      }
      p.obj.position.lerpVectors(p.a, p.b, p.t);
    }
  });

  return (
    <group ref={group}>
      {/* Core security crystal */}
      <mesh>
        <icosahedronGeometry args={[0.95, 1]} />
        <meshBasicMaterial color="#0e7490" wireframe transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[Math.PI / 2.6, 0, 0]}>
        <torusGeometry args={[1.7, 0.008, 8, 90]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.35} />
      </mesh>

      {/* Nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[pointColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          map={glow}
          size={0.16}
          vertexColors
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>

      {/* Edges */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[edges, 3]} />
          <bufferAttribute attach="attributes-color" args={[edgeColors, 3]} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.55} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>

      {/* Packets */}
      {packetSprites.map(({ obj }, i) => (
        <primitive key={i} object={obj} />
      ))}
    </group>
  );
}

export default function HeroScene() {
  const isMobile = useIsMobile();
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [visible, setVisible] = useState(true);
  const count = isMobile ? 70 : 130;

  useEffect(() => {
    const el = document.getElementById("home");
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.02,
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-0"
      style={{ pointerEvents: "none" }}
    >
      <Canvas
        frameloop={visible ? "always" : "demand"}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        camera={{ position: [0, 0.4, 7.2], fov: 50 }}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Network count={count} reduced={reduced} />
      </Canvas>
    </div>
  );
}
