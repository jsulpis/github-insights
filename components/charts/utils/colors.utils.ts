/**
 * Transform a color in hexa format
 * @param color
 * @param lightening between 0 and 100
 * @param desaturation between 0 and 1
 */
export function shadeColor(color, lightening, desaturation) {
  let colorRgb = hexaToRgb(color);
  colorRgb = desaturateRgb(colorRgb, desaturation);
  colorRgb = lightenRgb(colorRgb, lightening);

  const [RR, GG, BB] = colorRgb.map(col => col.toString(16).padStart(2, "0"));
  return "#" + RR + GG + BB;
}

function hexaToRgb(colorHexa: string): number[] {
  const R = parseInt(colorHexa.substring(1, 3), 16);
  const G = parseInt(colorHexa.substring(3, 5), 16);
  const B = parseInt(colorHexa.substring(5, 7), 16);
  return [R, G, B];
}

function desaturateRgb(colorRgb: number[], percent: number): number[] {
  const [R, G, B] = colorRgb;
  const med = 0.3 * R + 0.6 * G + 0.1 * B;
  const Rdesat = Math.floor(R + percent * (med - R));
  const Gdesat = Math.floor(G + percent * (med - G));
  const Bdesat = Math.floor(B + percent * (med - B));
  return [Rdesat, Gdesat, Bdesat];
}

function lightenRgb(colorRgb: number[], percent: number): number[] {
  const [R, G, B] = colorRgb;
  let Rlight = Math.floor((R * (100 + percent)) / 100);
  let Glight = Math.floor((G * (100 + percent)) / 100);
  let Blight = Math.floor((B * (100 + percent)) / 100);

  Rlight = Rlight < 255 ? Rlight : 255;
  Glight = Glight < 255 ? Glight : 255;
  Blight = Blight < 255 ? Blight : 255;
  return [Rlight, Glight, Blight];
}
