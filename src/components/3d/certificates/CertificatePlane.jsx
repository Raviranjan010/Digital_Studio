// CertificatePlane.jsx — Individual 3D certificate plane with smooth lerp animation
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { DoubleSide, MathUtils } from "three";
import { createCertTexture } from "./createCertTexture";

const CertificatePlane = ({ cert, index, total, rotationY, activeIndex, radius }) => {
  const meshRef = useRef(null);

  // Generate canvas texture once per cert
  const texture = useMemo(() => createCertTexture(cert), [cert]);

  useFrame(() => {
    if (!meshRef.current) return;

    const angle = (index / total) * Math.PI * 2 + rotationY;
    const targetX = Math.sin(angle) * radius;
    const targetZ = Math.cos(angle) * radius - 0.4;
    const targetY = Math.sin(angle * 0.5) * 0.2;

    // Focus factor — items in front are more opaque
    const normalized = ((angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    const focus = Math.max(0.35, Math.cos(normalized));
    const scale = index === activeIndex ? 1.1 : 0.94;

    // Smooth lerp towards target positions
    meshRef.current.position.x = MathUtils.lerp(meshRef.current.position.x, targetX, 0.08);
    meshRef.current.position.y = MathUtils.lerp(meshRef.current.position.y, targetY, 0.08);
    meshRef.current.position.z = MathUtils.lerp(meshRef.current.position.z, targetZ, 0.08);
    meshRef.current.rotation.y = MathUtils.lerp(meshRef.current.rotation.y, -angle, 0.08);
    meshRef.current.scale.x = MathUtils.lerp(meshRef.current.scale.x, scale, 0.08);
    meshRef.current.scale.y = MathUtils.lerp(meshRef.current.scale.y, scale, 0.08);

    // Fade based on depth focus
    const mat = meshRef.current.material;
    mat.opacity = MathUtils.lerp(mat.opacity, 0.22 + focus * 0.78, 0.08);
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2.3, 1.58]} />
      <meshBasicMaterial
        map={texture}
        side={DoubleSide}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
};

export default CertificatePlane;
