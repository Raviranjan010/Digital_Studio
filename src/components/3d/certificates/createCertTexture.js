// createCertTexture.js — Generates a Canvas-based texture for certificate 3D planes
import { CanvasTexture } from "three";

/**
 * Creates a beautiful certificate card texture using HTML Canvas
 * @param {{ title: string, org: string, year: string, color: string, icon: string }} cert
 * @returns {CanvasTexture}
 */
export function createCertTexture(cert) {
  const W = 920;
  const H = 632;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");

  // Background — dark glass card
  const bgGrad = ctx.createLinearGradient(0, 0, W, H);
  bgGrad.addColorStop(0, "#0e0e10");
  bgGrad.addColorStop(0.5, "#16161a");
  bgGrad.addColorStop(1, "#0e0e10");
  roundRect(ctx, 0, 0, W, H, 36, bgGrad);

  // Subtle border glow
  ctx.strokeStyle = hexToRgba(cert.color, 0.35);
  ctx.lineWidth = 2;
  roundRectStroke(ctx, 2, 2, W - 4, H - 4, 34);

  // Inner glow accent — top-left corner
  const glowGrad = ctx.createRadialGradient(80, 80, 0, 80, 80, 320);
  glowGrad.addColorStop(0, hexToRgba(cert.color, 0.12));
  glowGrad.addColorStop(1, "transparent");
  ctx.fillStyle = glowGrad;
  ctx.fillRect(0, 0, W, H);

  // Decorative top line accent
  const lineGrad = ctx.createLinearGradient(60, 0, W - 60, 0);
  lineGrad.addColorStop(0, "transparent");
  lineGrad.addColorStop(0.5, hexToRgba(cert.color, 0.6));
  lineGrad.addColorStop(1, "transparent");
  ctx.fillStyle = lineGrad;
  ctx.fillRect(60, 50, W - 120, 2);

  // Icon
  ctx.font = "64px serif";
  ctx.textAlign = "left";
  ctx.fillText(cert.icon, 60, 140);

  // "CERTIFICATE" label
  ctx.font = "600 13px 'Inter', 'Segoe UI', sans-serif";
  ctx.fillStyle = hexToRgba(cert.color, 0.9);
  ctx.letterSpacing = "4px";
  ctx.textAlign = "left";
  ctx.fillText("CERTIFICATE", 60, 200);

  // Title
  ctx.font = "700 36px 'Inter', 'Segoe UI', sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.letterSpacing = "0px";
  wrapText(ctx, cert.title, 60, 260, W - 120, 46);

  // Divider
  const divGrad = ctx.createLinearGradient(60, 0, 400, 0);
  divGrad.addColorStop(0, hexToRgba(cert.color, 0.5));
  divGrad.addColorStop(1, "transparent");
  ctx.fillStyle = divGrad;
  ctx.fillRect(60, 340, 340, 1.5);

  // Org name
  ctx.font = "500 18px 'Inter', 'Segoe UI', sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.fillText(cert.org, 60, 390);

  // Year badge
  const yearX = W - 140;
  const yearY = 370;
  ctx.fillStyle = hexToRgba(cert.color, 0.15);
  roundRect(ctx, yearX, yearY, 80, 34, 17, hexToRgba(cert.color, 0.15));
  ctx.strokeStyle = hexToRgba(cert.color, 0.4);
  ctx.lineWidth = 1;
  roundRectStroke(ctx, yearX, yearY, 80, 34, 17);
  ctx.font = "600 14px 'Inter', 'Segoe UI', sans-serif";
  ctx.fillStyle = cert.color;
  ctx.textAlign = "center";
  ctx.fillText(cert.year, yearX + 40, yearY + 22);
  ctx.textAlign = "left";

  // Bottom decorative dots
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.arc(60 + i * 18, H - 60, 3, 0, Math.PI * 2);
    ctx.fillStyle = hexToRgba(cert.color, 0.2 + i * 0.12);
    ctx.fill();
  }

  // Bottom-right grid pattern
  ctx.globalAlpha = 0.04;
  for (let gx = 0; gx < 6; gx++) {
    for (let gy = 0; gy < 4; gy++) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(W - 180 + gx * 22, H - 120 + gy * 22, 12, 12);
    }
  }
  ctx.globalAlpha = 1;

  const texture = new CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// ─── Helpers ──────────────────────────────────────────────

function roundRect(ctx, x, y, w, h, r, fill) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
}

function roundRectStroke(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.stroke();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  let ty = y;
  for (const word of words) {
    const testLine = line + word + " ";
    if (ctx.measureText(testLine).width > maxWidth && line !== "") {
      ctx.fillText(line, x, ty);
      line = word + " ";
      ty += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, ty);
}

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}
