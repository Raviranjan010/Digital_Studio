// CertificatesSection.jsx — Premium 3D carousel certification section
import { useEffect, useRef, useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import CarouselScene from "../components/3d/certificates/CarouselScene";
import { CERTIFICATIONS } from "../constants/certifications";
import { useIsMobile } from "../hooks/useIsMobile";
import ScrollReveal from "../components/ui/ScrollReveal";
import { Icon } from "@iconify/react/dist/iconify.js";

const CertificatesSection = () => {
  const isMobile = useIsMobile();
  const [rotationY, setRotationY] = useState(0);
  const dragState = useRef({ dragging: false, lastX: 0, velocity: 0.012 });

  // Auto-rotation + drag momentum loop
  useEffect(() => {
    let frameId = 0;

    const tick = () => {
      dragState.current.velocity *= dragState.current.dragging ? 0.94 : 0.985;
      if (Math.abs(dragState.current.velocity) < 0.0015) {
        dragState.current.velocity = 0.004;
      }

      setRotationY((prev) => prev + dragState.current.velocity);
      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, []);

  // Compute which cert is "active" (facing camera)
  const normalizedAngle =
    ((-rotationY % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
  const activeIndex =
    Math.round((normalizedAngle / (Math.PI * 2)) * CERTIFICATIONS.length) %
    CERTIFICATIONS.length;
  const activeCert = CERTIFICATIONS[activeIndex];
  const radius = isMobile ? 2.5 : 3.4;

  // Side cards — show other certs besides the active one
  const sideCards = useMemo(
    () =>
      CERTIFICATIONS.filter((_, idx) => idx !== activeIndex).slice(
        0,
        isMobile ? 2 : 3
      ),
    [activeIndex, isMobile]
  );

  // Pointer handlers for drag interaction
  const onPointerDown = (e) => {
    dragState.current.dragging = true;
    dragState.current.lastX = e.clientX;
  };

  const onPointerMove = (e) => {
    if (!dragState.current.dragging) return;
    const delta = e.clientX - dragState.current.lastX;
    dragState.current.velocity = delta * 0.0018;
    setRotationY((prev) => prev + dragState.current.velocity);
    dragState.current.lastX = e.clientX;
  };

  const onPointerUp = () => {
    dragState.current.dragging = false;
  };

  return (
    <section id="certifications" className="cert-section">
      <div className="cert-section-inner">
        {/* Header */}
        <ScrollReveal>
          <p className="cert-label">
            <Icon
              icon="mdi:certificate-outline"
              className="cert-label-icon"
            />
            Certificates
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="cert-heading">
            Credentials &amp; Certifications
          </h2>
        </ScrollReveal>

        {/* Main content grid */}
        <div className="cert-content-grid">
          {/* 3D Canvas carousel */}
          <ScrollReveal delay={0.18}>
            <div
              className="cert-canvas-wrap"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerLeave={onPointerUp}
            >
              <Canvas
                camera={{ position: [0, 0.1, 5], fov: 42 }}
                gl={{ alpha: true, antialias: true }}
              >
                <CarouselScene
                  rotationY={rotationY}
                  activeIndex={activeIndex}
                  radius={radius}
                />
              </Canvas>

              {/* Edge fade gradients */}
              <div className="cert-fade cert-fade-left" />
              <div className="cert-fade cert-fade-right" />

              {/* Drag hint */}
              <div className="cert-drag-hint">
                <Icon icon="mdi:gesture-swipe-horizontal" className="cert-drag-icon" />
                <span>Drag to explore</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Info panel */}
          <div className="cert-info-col">
            {/* Active cert detail card */}
            <ScrollReveal delay={0.22}>
              <div className="cert-detail-card">
                <div className="cert-detail-header">
                  <span
                    className="cert-detail-dot"
                    style={{ backgroundColor: activeCert.color }}
                  />
                  <p className="cert-detail-label">Now centered</p>
                </div>
                <h3 className="cert-detail-title">{activeCert.title}</h3>
                <p className="cert-detail-meta">
                  {activeCert.org} · {activeCert.year}
                </p>
                <p className="cert-detail-desc">
                  Drag through the curved archive to explore certifications.
                  Momentum and auto-rotation keep the carousel alive.
                </p>
                <div className="cert-detail-bar">
                  <div
                    className="cert-detail-bar-fill"
                    style={{
                      width: `${((activeIndex + 1) / CERTIFICATIONS.length) * 100}%`,
                      backgroundColor: activeCert.color,
                    }}
                  />
                </div>
                <p className="cert-detail-count">
                  {activeIndex + 1} / {CERTIFICATIONS.length}
                </p>
              </div>
            </ScrollReveal>

            {/* Side cert cards */}
            <div className="cert-side-grid">
              {sideCards.map((cert, idx) => (
                <ScrollReveal key={cert.title} delay={0.26 + idx * 0.06}>
                  <div className="cert-side-card">
                    <div className="cert-side-card-inner">
                      <span
                        className="cert-side-dot"
                        style={{ backgroundColor: cert.color }}
                      />
                      <div>
                        <p className="cert-side-title">{cert.title}</p>
                        <p className="cert-side-meta">
                          {cert.org} · {cert.year}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;
