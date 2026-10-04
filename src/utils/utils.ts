// src/utils/geometry.ts
import { ShaderMaterial, Group } from "three";

export function hexToVec3Srgb(hex: number): number[] {
  const r = ((hex >> 16) & 0xff) / 255;
  const g = ((hex >> 8) & 0xff) / 255;
  const b = (hex & 0xff) / 255;
  const srgb = [r, g, b];
  return srgb;
}
export function hexToCSS(hex: number): string {
  return `#${hex.toString(16).padStart(6, "0")}`;
}
export function hexToStringSrgb(hex: number): string {
  const srgb = hexToVec3Srgb(hex);
  return `(${srgb[0]},${srgb[1]},${srgb[2]})`;
}
export function hexToVec3Linear(hex: number, po:number=2.4): number[] {
  const srgb = hexToVec3Srgb(hex);
  const linear = srgb.map((c) =>
    c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, po),
  );
  return linear;
}
export function mixHexColors(
  color1: number,
  color2: number,
  t: number,
): number[] {
  const r1 = (color1 >> 16) & 0xff;
  const g1 = (color1 >> 8) & 0xff;
  const b1 = color1 & 0xff;
  const r2 = (color2 >> 16) & 0xff;
  const g2 = (color2 >> 8) & 0xff;
  const b2 = color2 & 0xff;
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);
  // return (r << 16) | (g << 8) | b;
  return [r / 255, g / 255, b / 255];
}
export function hexToStringLinear(hex: number, po:number=2.4): string {
  const srgb = hexToVec3Linear(hex, po);
  return `(${srgb[0]},${srgb[1]},${srgb[2]})`;
}
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  return outMin + ((value - inMin) * (outMax - outMin)) / (inMax - inMin);
}
export function isMobile(): boolean {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}