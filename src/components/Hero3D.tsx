import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  Environment,
  ContactShadows,
  Stars,
  RoundedBox,
  Html,
  PerspectiveCamera,
} from "@react-three/drei";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";
import { useScrollProgressRef } from "@/lib/useScrollProgress";

// Shared scroll progress ref, populated by <Scene /> and read by children.
const scrollRef = { current: 0 };

/* ---------- Realistic MacBook ---------- */
function MacBook({ position = [0, 0, 0] as [number, number, number] }) {
  const group = useRef<THREE.Group>(null!);
  const screenTex = useMemo(() => createLaptopScreen(), []);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const s = scrollRef.current;
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.3) * 0.15 - 0.25 + s * 1.4;
      group.current.rotation.x = s * 0.35;
      group.current.position.y = position[1] + Math.sin(t * 0.8) * 0.08 - s * 1.2;
      group.current.position.z = -s * 1.5;
    }
  });

  return (
    <group ref={group} position={position} rotation={[0, -0.25, 0]} scale={1.1}>
      <RoundedBox args={[2.6, 0.09, 1.75]} radius={0.04} smoothness={6} castShadow receiveShadow>
        <meshStandardMaterial color="#d8d8dc" metalness={0.85} roughness={0.28} envMapIntensity={1.2} />
      </RoundedBox>
      <mesh position={[0, 0.046, 0.15]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2.3, 1.2]} />
        <meshStandardMaterial color="#1a1a1f" metalness={0.5} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.047, 0.62]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[1.1, 0.7]} />
        <meshStandardMaterial color="#2a2a30" metalness={0.6} roughness={0.4} />
      </mesh>

      <group position={[0, 0.04, -0.86]} rotation={[-1.85, 0, 0]}>
        <RoundedBox args={[2.6, 1.65, 0.06]} radius={0.04} smoothness={6} castShadow>
          <meshStandardMaterial color="#c8c8cc" metalness={0.9} roughness={0.25} envMapIntensity={1.4} />
        </RoundedBox>
        <mesh position={[0, 0, 0.032]}>
          <planeGeometry args={[2.5, 1.55]} />
          <meshStandardMaterial color="#000000" roughness={0.4} />
        </mesh>
        {screenTex && (
          <mesh position={[0, 0, 0.034]}>
            <planeGeometry args={[2.35, 1.42]} />
            <meshBasicMaterial toneMapped={false}>
              <canvasTexture attach="map" args={[screenTex]} colorSpace={THREE.SRGBColorSpace} />
            </meshBasicMaterial>
          </mesh>
        )}
        <mesh position={[0, 0.7, 0.034]}>
          <planeGeometry args={[0.3, 0.06]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
      </group>
    </group>
  );
}

/* ---------- Realistic iPhone ---------- */
function Phone({
  position = [0, 0, 0] as [number, number, number],
  rotation = [0, 0, 0] as [number, number, number],
  screen = "fintech",
  speed = 1,
}: {
  position?: [number, number, number];
  rotation?: [number, number, number];
  screen?: "fintech" | "dashboard";
  speed?: number;
}) {
  const ref = useRef<THREE.Group>(null!);
  const screenTex = useMemo(
    () => (screen === "fintech" ? createFintechScreen() : createDashboardScreen()),
    [screen]
  );
  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    if (ref.current) {
      ref.current.rotation.y = rotation[1] + Math.sin(t * 0.6) * 0.25;
      ref.current.rotation.x = rotation[0] + Math.cos(t * 0.5) * 0.1;
      ref.current.position.y = position[1] + Math.sin(t * 1.1) * 0.12;
    }
  });

  return (
    <group ref={ref} position={position} rotation={rotation}>
      {/* Body */}
      <RoundedBox args={[0.7, 1.42, 0.09]} radius={0.11} smoothness={8} castShadow receiveShadow>
        <meshStandardMaterial color="#1c1c22" metalness={0.95} roughness={0.18} envMapIntensity={1.4} />
      </RoundedBox>
      {/* Side titanium frame highlight */}
      <RoundedBox args={[0.71, 1.43, 0.085]} radius={0.11} smoothness={8}>
        <meshStandardMaterial color="#3a3a44" metalness={1} roughness={0.3} transparent opacity={0.4} />
      </RoundedBox>
      {/* Screen */}
      {screenTex && (
        <mesh position={[0, 0, 0.046]}>
          <planeGeometry args={[0.62, 1.32]} />
          <meshBasicMaterial toneMapped={false}>
            <canvasTexture attach="map" args={[screenTex]} colorSpace={THREE.SRGBColorSpace} />
          </meshBasicMaterial>
        </mesh>
      )}
      {/* Dynamic island */}
      <mesh position={[0, 0.58, 0.047]}>
        <planeGeometry args={[0.22, 0.05]} />
        <meshBasicMaterial color="#000" />
      </mesh>
    </group>
  );
}

/* ---------- Canvas textures for realistic UI on screens ---------- */
function makeCanvas(w: number, h: number, draw: (ctx: CanvasRenderingContext2D) => void) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;
  draw(ctx);
  return c;
}

function createLaptopScreen() {
  return makeCanvas(1280, 800, (ctx) => {
    // Background gradient
    const g = ctx.createLinearGradient(0, 0, 1280, 800);
    g.addColorStop(0, "#0B2E6B");
    g.addColorStop(1, "#061a3f");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 1280, 800);

    // Sidebar
    ctx.fillStyle = "rgba(255,255,255,0.05)";
    ctx.fillRect(0, 0, 220, 800);
    ctx.fillStyle = "#F9A826";
    ctx.fillRect(20, 28, 36, 36);
    ctx.fillStyle = "#fff";
    ctx.font = "600 22px Inter, sans-serif";
    ctx.fillText("InkotaSoft", 70, 54);

    const items = ["Dashboard", "Analytics", "Customers", "Revenue", "Settings"];
    items.forEach((it, i) => {
      ctx.fillStyle = i === 0 ? "rgba(249,168,38,0.15)" : "transparent";
      ctx.fillRect(12, 110 + i * 50, 196, 38);
      ctx.fillStyle = i === 0 ? "#F9A826" : "rgba(255,255,255,0.7)";
      ctx.font = "500 15px Inter";
      ctx.fillText(it, 32, 134 + i * 50);
    });

    // Header
    ctx.fillStyle = "#fff";
    ctx.font = "700 32px Inter";
    ctx.fillText("Revenue Overview", 260, 70);
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.font = "400 14px Inter";
    ctx.fillText("Last 30 days · live", 260, 96);

    // Stat cards
    const stats = [
      ["$248.9K", "+18.4%", "Revenue"],
      ["12,482", "+9.2%", "Users"],
      ["98.6%", "+0.4%", "Uptime"],
    ];
    stats.forEach((s, i) => {
      const x = 260 + i * 320;
      ctx.fillStyle = "rgba(255,255,255,0.08)";
      roundRect(ctx, x, 130, 290, 110, 14);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.font = "700 30px Inter";
      ctx.fillText(s[0], x + 20, 178);
      ctx.fillStyle = "#F9A826";
      ctx.font = "600 14px Inter";
      ctx.fillText(s[1], x + 20, 208);
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      ctx.font = "400 13px Inter";
      ctx.fillText(s[2], x + 80, 208);
    });

    // Chart card
    ctx.fillStyle = "rgba(255,255,255,0.08)";
    roundRect(ctx, 260, 270, 930, 420, 16);
    ctx.fill();

    // Chart grid
    ctx.strokeStyle = "rgba(255,255,255,0.06)";
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.moveTo(290, 340 + i * 60);
      ctx.lineTo(1160, 340 + i * 60);
      ctx.stroke();
    }
    // Area chart
    const pts: [number, number][] = [];
    for (let i = 0; i <= 30; i++) {
      const x = 290 + (i / 30) * 870;
      const y = 600 - (Math.sin(i * 0.5) * 60 + i * 7 + Math.random() * 20);
      pts.push([x, y]);
    }
    const grad = ctx.createLinearGradient(0, 340, 0, 640);
    grad.addColorStop(0, "rgba(249,168,38,0.5)");
    grad.addColorStop(1, "rgba(249,168,38,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(pts[0][0], 640);
    pts.forEach((p) => ctx.lineTo(p[0], p[1]));
    ctx.lineTo(pts[pts.length - 1][0], 640);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#F9A826";
    ctx.lineWidth = 3;
    ctx.beginPath();
    pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
    ctx.stroke();
  });
}

function createFintechScreen() {
  return makeCanvas(540, 1170, (ctx) => {
    const g = ctx.createLinearGradient(0, 0, 0, 1170);
    g.addColorStop(0, "#0B2E6B");
    g.addColorStop(1, "#03102b");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 540, 1170);

    // Status bar
    ctx.fillStyle = "#fff";
    ctx.font = "600 20px Inter";
    ctx.fillText("9:41", 36, 50);

    ctx.font = "500 16px Inter";
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.fillText("Total Balance", 36, 160);
    ctx.fillStyle = "#fff";
    ctx.font = "700 56px Inter";
    ctx.fillText("$84,239.50", 36, 220);
    ctx.fillStyle = "#F9A826";
    ctx.font = "600 18px Inter";
    ctx.fillText("+ $1,284 today", 36, 252);

    // Card
    const cg = ctx.createLinearGradient(36, 300, 504, 580);
    cg.addColorStop(0, "#F9A826");
    cg.addColorStop(1, "#b9701a");
    ctx.fillStyle = cg;
    roundRect(ctx, 36, 300, 468, 260, 24);
    ctx.fill();
    ctx.fillStyle = "rgba(0,0,0,0.85)";
    ctx.font = "700 22px Inter";
    ctx.fillText("INKOTASOFT", 60, 340);
    ctx.font = "500 16px Inter";
    ctx.fillText("Platinum", 60, 364);
    ctx.font = "600 30px Inter";
    ctx.fillText("•••• •••• •••• 4829", 60, 510);

    // Actions
    ["Send", "Receive", "Invest", "Pay"].forEach((a, i) => {
      ctx.fillStyle = "rgba(255,255,255,0.08)";
      roundRect(ctx, 36 + i * 122, 610, 102, 102, 22);
      ctx.fill();
      ctx.fillStyle = "#F9A826";
      ctx.beginPath();
      ctx.arc(36 + i * 122 + 51, 650, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.font = "500 14px Inter";
      ctx.textAlign = "center";
      ctx.fillText(a, 36 + i * 122 + 51, 695);
      ctx.textAlign = "left";
    });

    // Transactions
    ctx.fillStyle = "#fff";
    ctx.font = "600 20px Inter";
    ctx.fillText("Recent Activity", 36, 770);
    const tx = [
      ["Apple Store", "-$129.00"],
      ["Salary · Stripe", "+$8,400"],
      ["Spotify", "-$9.99"],
    ];
    tx.forEach((t, i) => {
      const y = 800 + i * 90;
      ctx.fillStyle = "rgba(255,255,255,0.06)";
      roundRect(ctx, 36, y, 468, 72, 16);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.font = "600 17px Inter";
      ctx.fillText(t[0], 60, y + 32);
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.font = "400 13px Inter";
      ctx.fillText("Today · 12:0" + (i + 1), 60, y + 54);
      ctx.fillStyle = t[1].startsWith("+") ? "#4ade80" : "#fff";
      ctx.font = "600 17px Inter";
      ctx.textAlign = "right";
      ctx.fillText(t[1], 484, y + 44);
      ctx.textAlign = "left";
    });
  });
}

function createDashboardScreen() {
  return makeCanvas(540, 1170, (ctx) => {
    ctx.fillStyle = "#0a0a14";
    ctx.fillRect(0, 0, 540, 1170);

    ctx.fillStyle = "#fff";
    ctx.font = "700 28px Inter";
    ctx.fillText("Analytics", 36, 110);
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.font = "400 14px Inter";
    ctx.fillText("Realtime · 12,482 online", 36, 138);

    // Big stat
    ctx.fillStyle = "rgba(249,168,38,0.12)";
    roundRect(ctx, 36, 180, 468, 200, 20);
    ctx.fill();
    ctx.fillStyle = "#F9A826";
    ctx.font = "700 60px Inter";
    ctx.fillText("98.6%", 60, 270);
    ctx.fillStyle = "#fff";
    ctx.font = "500 18px Inter";
    ctx.fillText("Conversion rate", 60, 310);
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.font = "400 14px Inter";
    ctx.fillText("↑ 12% vs last week", 60, 340);

    // Bars
    ctx.fillStyle = "rgba(255,255,255,0.04)";
    roundRect(ctx, 36, 410, 468, 380, 20);
    ctx.fill();
    for (let i = 0; i < 7; i++) {
      const h = 60 + Math.random() * 230;
      ctx.fillStyle = i === 3 ? "#F9A826" : "rgba(255,255,255,0.25)";
      roundRect(ctx, 70 + i * 60, 770 - h, 36, h, 8);
      ctx.fill();
    }

    // List
    for (let i = 0; i < 3; i++) {
      const y = 830 + i * 90;
      ctx.fillStyle = "rgba(255,255,255,0.04)";
      roundRect(ctx, 36, y, 468, 72, 16);
      ctx.fill();
      ctx.fillStyle = "#F9A826";
      ctx.beginPath();
      ctx.arc(72, y + 36, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.font = "600 16px Inter";
      ctx.fillText(["New user signup", "Payment received", "API milestone"][i], 110, y + 32);
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.font = "400 13px Inter";
      ctx.fillText("2 min ago", 110, y + 54);
    }
  });
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/* ---------- Floating particles ---------- */
function Particles() {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const arr = new Float32Array(800 * 3);
    for (let i = 0; i < 800; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    return arr;
  }, []);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#F9A826" transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

/* ---------- Mouse parallax rig ---------- */
function CameraRig() {
  const { camera, pointer } = useThree();
  useFrame(() => {
    camera.position.x += (pointer.x * 1.2 - camera.position.x) * 0.04;
    camera.position.y += (-pointer.y * 0.6 + 0.4 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.4, 6.5]} fov={42} />
      <CameraRig />

      <color attach="background" args={["transparent"]} />
      <fog attach="fog" args={["#03061a", 8, 18]} />

      <ambientLight intensity={0.35} />
      <directionalLight
        position={[5, 6, 5]}
        intensity={1.6}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-4, -2, -3]} intensity={1.2} color="#F9A826" />
      <pointLight position={[4, 3, -2]} intensity={0.8} color="#3b82f6" />
      <spotLight position={[0, 5, 4]} angle={0.5} penumbra={1} intensity={1} castShadow />

      <Stars radius={60} depth={50} count={2000} factor={3} fade speed={1} />
      <Particles />

      <Float speed={1.1} rotationIntensity={0.15} floatIntensity={0.6}>
        <MacBook position={[-0.4, -0.4, 0]} />
      </Float>

      <Float speed={1.6} rotationIntensity={0.4} floatIntensity={1.2}>
        <Phone position={[2.6, 0.4, 0.8]} rotation={[0.1, -0.5, 0.15]} screen="fintech" speed={1} />
      </Float>

      <Float speed={1.8} rotationIntensity={0.5} floatIntensity={1.4}>
        <Phone position={[-3, 1.4, -0.5]} rotation={[-0.05, 0.6, -0.2]} screen="dashboard" speed={1.2} />
      </Float>

      <ContactShadows position={[0, -1.6, 0]} opacity={0.55} scale={14} blur={2.6} far={4} color="#000" />

      <Environment preset="city" />
    </>
  );
}

export function Hero3D() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Suspense fallback={<Html center><div className="text-xs text-muted-foreground">Loading 3D scene…</div></Html>}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
