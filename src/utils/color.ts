
/** simple type for HSL - don't use object not efficient enough */
export type HSLColor = [number, number, number];
const HSLHue = 0;
const HSLSat = 1;
const HSLLight = 2;

/** simple type for RGB - don't use object not efficient enough */
export type RGBColor = [number, number, number];
const Red = 0;
const Green = 1;
const Blue = 2;

/**
 * HSL to RGB conversion
 * @param h hue as an angle in [0,360]
 * @param s saturation in [0,1]
 * @param l lightness in [0,1]
 * @returns 
 */
export const HSLtoRGB = (hsl: HSLColor): RGBColor => {
  const a = hsl[HSLSat] * Math.min(hsl[HSLLight], 1 - hsl[HSLLight]);
  const f = (n, k = (n + hsl[HSLHue] / 30) % 12) => hsl[HSLLight] - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  return [ 
    f(0), 
    f(8), 
    f(4)
  ];
}

/**
 * RGB to HSL conversion
 * @param r red value in [0,1]
 * @param g red value in [0,1]
 * @param b red value in [0,1]
 * @returns h in [0,360) and s,l in [0,1]
 */
export const RGBtoHSL = (rgb: RGBColor): HSLColor => {
  const v = Math.max(rgb[Red], rgb[Green], rgb[Blue]), c = v - Math.min(rgb[Red], rgb[Green], rgb[Blue]), f = (1 - Math.abs(v + v - c - 1));
  const h = c && ((v == rgb[Red]) ? (rgb[Green] - rgb[Blue]) / c : ((v == rgb[Green]) ? 2 + (rgb[Blue] - rgb[Red]) / c : 4 + (rgb[Red] - rgb[Green]) / c));
  return [
    60 * (h < 0 ? h + 6 : h), 
    f ? c / f : 0, 
    (v + v - c) / 2
  ];
}