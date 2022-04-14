// Utils for working with canvas HTML elements

import { HSLColor, HSLtoRGB, RGBtoHSL } from "./color";

/**
 * Higher order function to retrieve pixel data from canvas element, passing
 * that to given callback function fn and then setting result back to canvas
 * @param fn function to callback with image data
 * @returns 
 */
export const applyImageDataTransform = (fn: (data: ImageData) => void) => 
  (canvas: HTMLCanvasElement, width: number, height: number) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }
    const imageData = ctx.getImageData(0, 0, width, height);
    fn(imageData);
    ctx.putImageData(imageData, 0, 0);
  }

/**
 * Higher order function to apply canvas pixel data transformation, converting each
 * pixel to HSL values first before calling fn()
 * @param fn HSL converstion function
 * @returns 
 */
export const applyHslDataTransform = (fn: (hsl: HSLColor) => HSLColor) => {
    return applyImageDataTransform((canvasImageData) => {
      console.log(canvasImageData.data.length / 4)
      for (let i = 0; i < canvasImageData.data.length; i += 4) {
        /*
        const hsl = RGBtoHSL([
          canvasImageData[i] / 255,
          canvasImageData[i + 1] / 255,
          canvasImageData[i + 2] / 255
        ]);
        const hslTransformed = fn(hsl);
        const rgb = HSLtoRGB(hslTransformed);
        canvasImageData[i] = rgb[0] * 255;
        canvasImageData[i + 1] = rgb[1] * 255;
        canvasImageData[i + 2] = rgb[2] * 255;
        */
       const rgb = [
         canvasImageData[i],
          canvasImageData[i + 1],
          canvasImageData[i + 2]
        ]

        canvasImageData[i] = rgb[0];
        canvasImageData[i + 1] = rgb[1];
        canvasImageData[i + 2] = rgb[2];
      }
    });
  }