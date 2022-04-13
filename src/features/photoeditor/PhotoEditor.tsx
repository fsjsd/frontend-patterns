import React, { useLayoutEffect, useRef } from 'react'
import { PhotoEditorWrapper as PhotoEditorWrapper } from './PhotoEditorStyles'

// input: h as an angle in [0,360] and s,l in [0,1] - output: r,g,b in [0,1]
function hsl2rgb(h: number, s: number, l: number) {
  const a = s * Math.min(l, 1 - l);
  const f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  return [f(0), f(8), f(4)];
}

// in: r,g,b in [0,1], out: h in [0,360) and s,l in [0,1]
function rgb2hsl(r: number, g: number, b: number) {
  const v = Math.max(r, g, b), c = v - Math.min(r, g, b), f = (1 - Math.abs(v + v - c - 1));
  const h = c && ((v == r) ? (g - b) / c : ((v == g) ? 2 + (b - r) / c : 4 + (r - g) / c));
  return [60 * (h < 0 ? h + 6 : h), f ? c / f : 0, (v + v - c) / 2];
}


const imagePromise = (src: string) => {
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

const applyCommand = (fn) => {
  return (canvas: HTMLCanvasElement, width: number, height: number) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }
    const imageData = ctx.getImageData(0, 0, width, height);
    fn(imageData.data);
    ctx.putImageData(imageData, 0, 0);
  }
}
const applyHslCommand = (fn) => {
  return applyCommand((myImageData) => {
    for (let i = 0; i < myImageData.length; i += 4) {
      const [h, s, l] = rgb2hsl(myImageData[i] / 255, myImageData[i + 1] / 255, myImageData[i + 2] / 255);
      const [h1, s1, l1] = fn(h, s, l);
      const [r, g, b] = hsl2rgb(h1, s1, l1);
      myImageData[i] = r * 255;
      myImageData[i + 1] = g * 255;
      myImageData[i + 2] = b * 255;
    }
  });
}

const commands = {
  invert: (canvas: HTMLCanvasElement, width: number, height: number) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }
    const myImageData = ctx.getImageData(0, 0, width, height);
    console.log(myImageData);
    for (let i = 0; i < myImageData.data.length; i += 4) {
      myImageData.data[i] = 255 - myImageData.data[i];
      myImageData.data[i + 1] = 255 - myImageData.data[i + 1];
      myImageData.data[i + 2] = 255 - myImageData.data[i + 2];
    }
    ctx.putImageData(myImageData, 0, 0);
  },
  saturate: applyHslCommand((h, s, l) => {
    return [h, s * 1.1, l];
  }),
  desaturate: applyHslCommand((h, s, l) => {
    return [h, s * 0.9, l];
  }),
  lighten: applyHslCommand((h, s, l) => {
    return [h, s, l * 1.05];
  }),
  darken: applyHslCommand((h, s, l) => {
    return [h, s, l * 0.95];
  }),
}

const draw = async (canvas: HTMLCanvasElement, width: number, height: number) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return;
  }
  ctx.clearRect(0, 0, width, height);
  const img = await imagePromise('https://picsum.photos/800/500');
  ctx.drawImage(img, 0, 0, width, height);
};

const PhotoEditor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const width = 800;
  const height = 600;

  useLayoutEffect(() => {
    if (canvasRef.current) {
      draw(canvasRef.current, width, height)
    }
  }, [canvasRef]);

  const handleCommand = (command: string) => {
    if (canvasRef.current) {
      commands[command](canvasRef.current, width, height);
    }
  }

  return (
    <PhotoEditorWrapper>
      <div role="toolbar">
        <button onClick={() => handleCommand('invert')}>Invert</button>
        <button onClick={() => handleCommand('saturate')}>Saturate</button>
        <button onClick={() => handleCommand('desaturate')}>Desaturate</button>
        <button onClick={() => handleCommand('lighten')}>Lighten</button>
        <button onClick={() => handleCommand('darken')}>Darken</button>
      </div>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
      ></canvas>
    </PhotoEditorWrapper>
  )
}

export default PhotoEditor