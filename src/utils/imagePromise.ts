/**
 * Loads an image from a URL and returns a promise that resolves to the image. Util
 * for working with canvas element images
 * @param src image URL ;
 * @returns Promise of Image Element
 */
 export const imagePromise = (src: string) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function () {
      resolve(img);
    };
    img.onerror = function (e) {
      reject(e);
    };
    img.src = src;
  });
}