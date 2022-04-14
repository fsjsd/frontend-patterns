import React, { useLayoutEffect, useRef } from 'react'
import { MdHdrStrong, MdHdrWeak, MdIso, MdLightbulb, MdLightbulbOutline } from 'react-icons/md';
import { applyHslDataTransform, applyImageDataTransform } from '../../utils/canvas';
import { HSLColor } from '../../utils/color';
import { imagePromise } from '../../utils/imagePromise';
import { Toolbar, ToolbarButton, ToolbarLabel, ToolbarSpacer } from '../../ux/designsystem/Toolbar';
import { PhotoEditorWrapper as PhotoEditorWrapper } from './PhotoEditorStyles'

const commands = {
  invert: applyImageDataTransform((myImageData: ImageData) => {
    for (let i = 0; i < myImageData.data.length; i += 4) {
      myImageData.data[i] = 255 - myImageData.data[i];
      myImageData.data[i + 1] = 255 - myImageData.data[i + 1];
      myImageData.data[i + 2] = 255 - myImageData.data[i + 2];
    }
  }),
  saturate: applyImageDataTransform((myImageData: ImageData) => {
    for (let i = 0; i < myImageData.data.length; i += 4) {
      myImageData.data[i] = 255 - myImageData.data[i];
      myImageData.data[i + 1] = 255 - myImageData.data[i + 1];
      myImageData.data[i + 2] = 255 - myImageData.data[i + 2];
    }
  }),
  saturateSlow: applyHslDataTransform((hsl: HSLColor) => {
    return [hsl[0], hsl[1] * 1.5, hsl[2]];
  }),
  desaturate: applyImageDataTransform((myImageData: ImageData) => {
    for (let i = 0; i < myImageData.data.length; i += 4) {
      myImageData.data[i] = 255 - myImageData.data[i];
      myImageData.data[i + 1] = 255 - myImageData.data[i + 1];
      myImageData.data[i + 2] = 255 - myImageData.data[i + 2];
    }
  }),
  desaturateSlow: applyHslDataTransform((hsl: HSLColor) => {
    return [hsl[0], hsl[1] * 0.9, hsl[2]];
  }),
  lighten: applyImageDataTransform((myImageData: ImageData) => {
    for (let i = 0; i < myImageData.data.length; i += 4) {
      myImageData.data[i] = 255 - myImageData.data[i];
      myImageData.data[i + 1] = 255 - myImageData.data[i + 1];
      myImageData.data[i + 2] = 255 - myImageData.data[i + 2];
    }
  }),
  darken: applyImageDataTransform((myImageData: ImageData) => {
    for (let i = 0; i < myImageData.data.length; i += 4) {
      myImageData.data[i] = 255 - myImageData.data[i];
      myImageData.data[i + 1] = 255 - myImageData.data[i + 1];
      myImageData.data[i + 2] = 255 - myImageData.data[i + 2];
    }
  }),
  lightenSlow: applyHslDataTransform((hsl: HSLColor) => {
    return [hsl[0], hsl[1], hsl[2] * 1.05];
  }),
  darkenSlow: applyHslDataTransform((hsl: HSLColor) => {
    return [hsl[0], hsl[1], hsl[2] * 0.95];
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
  const [processingInfo, setProcessingInfo] = React.useState("");

  const width = 800;
  const height = 600;

  const pixelCount = width * height;

  useLayoutEffect(() => {
    if (canvasRef.current) {
      draw(canvasRef.current, width, height)
    }
  }, [canvasRef]);

  const handleCommand = (command: string) => {
    if (canvasRef.current) {
      requestAnimationFrame(() => {
        let time = performance.now();
        commands[command](canvasRef.current, width, height);
        time = (performance.now() - time) * 1000;
        const rate = pixelCount / time;
        // const pps = (1000000 * rate | 0).toLocaleString();
        const rateInfo = (rate < 1) ? "less than 1" : rate.toLocaleString();
        // const debug = command + ". Time to process " + pixelCount.toLocaleString() + " pixels: " + (time | 0).toLocaleString() + "µs. " + rateInfo + "pix per µs. " + pps + " pixel per second";
        setProcessingInfo(`${rateInfo} pixels per µs`);

        // For HD pictures need a rate of about 125 pix per µs
        // 1. Code Start
        // saturate: 1.175 pix per µs
        // 2. color type array conversion
        // saturate: 1.325 pix per µs
        // invert is 68.571 pix per µs
      })
    }
  }

  return (
    <PhotoEditorWrapper>
      <Toolbar>
        <ToolbarButton onClick={() => handleCommand('invert')}>
          <MdIso /> Invert</ToolbarButton>
        <ToolbarButton onClick={() => handleCommand('saturate')}>
          <MdHdrStrong /> Saturate</ToolbarButton>
        <ToolbarButton onClick={() => handleCommand('desaturate')}>
          <MdHdrWeak /> Desaturate</ToolbarButton>
        <ToolbarButton onClick={() => handleCommand('lighten')}>
          <MdLightbulbOutline /> Lighten
        </ToolbarButton>
        <ToolbarButton onClick={() => handleCommand('darken')}>
          <MdLightbulb /> Darken
        </ToolbarButton>
        <ToolbarSpacer />
        <ToolbarLabel>
          {processingInfo}
        </ToolbarLabel>
      </Toolbar>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
      ></canvas>
    </PhotoEditorWrapper>
  )
}

export default PhotoEditor
