import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  TARGET_RATIO,
  WATERMARK_WIDTH,
  WATERMARK_OPACITY,
  WATERMARK_PADDING,
} from '@/constants/image';
import { Area } from 'react-easy-crop';

// 새로운 유틸리티 함수들
export const createCanvas = (width: number, height: number) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
};

export const calculateCropDimensions = (
  imgWidth: number,
  imgHeight: number,
): Area => {
  const imgRatio = imgWidth / imgHeight;
  let cropWidth = imgWidth;
  let cropHeight = imgHeight;
  let offsetX = 0;
  let offsetY = 0;

  if (imgRatio > TARGET_RATIO) {
    cropWidth = imgHeight * TARGET_RATIO;
    offsetX = (imgWidth - cropWidth) / 2;
  } else {
    cropHeight = imgWidth / TARGET_RATIO;
    offsetY = (imgHeight - cropHeight) / 2;
  }

  return { x: offsetX, y: offsetY, width: cropWidth, height: cropHeight };
};

export const drawImageWithCrop = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  offsetX: number,
  offsetY: number,
  cropWidth: number,
  cropHeight: number,
  additionalOffsetX = 0,
  additionalOffsetY = 0,
) => {
  // Clear canvas first
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Draw image to fill canvas completely
  ctx.drawImage(
    img,
    offsetX + additionalOffsetX,
    offsetY + additionalOffsetY,
    cropWidth,
    cropHeight,
    0,
    0,
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
  );
};

// 크롭된 영역을 캔버스에 그리는 함수
export const drawCroppedImage = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  crop?: Area,
) => {
  if (!crop) crop = calculateCropDimensions(img.width, img.height);

  // Clear canvas first
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Draw the cropped region to fill the entire canvas
  ctx.drawImage(
    img,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
  );
};

export const drawWatermark = async (ctx: CanvasRenderingContext2D) => {
  const watermarkImg = document.createElement('img');
  watermarkImg.src = './paul_logo.png';
  await new Promise((resolve) => {
    watermarkImg.onload = resolve;
  });

  const watermarkHeight =
    (WATERMARK_WIDTH / watermarkImg.width) * watermarkImg.height;
  ctx.globalAlpha = WATERMARK_OPACITY;
  ctx.drawImage(
    watermarkImg,
    WATERMARK_PADDING,
    WATERMARK_PADDING,
    WATERMARK_WIDTH,
    watermarkHeight,
  );

  // Reset global alpha to default
  ctx.globalAlpha = 1.0;
};

function drawMultilineText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  lineHeight: number,
) {
  const lines = text.split('\n'); // 줄바꿈 기준으로 분리
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    ctx.fillText(line, x, y + i * lineHeight);
  }
}

export const drawThumbnailText = async (
  ctx: CanvasRenderingContext2D,
  title: string,
  description: string,
) => {
  // Instead of drawing a background manually, overlay the thumbnail layout image
  const layoutImg = document.createElement('img');
  layoutImg.src = './thumbnail_layout.png';
  await new Promise((resolve) => {
    layoutImg.onload = resolve;
  });

  // Draw the layout image on top of the canvas
  ctx.drawImage(layoutImg, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Draw text in the middle bottom position (matching preview)
  const textY = CANVAS_HEIGHT * 0.3; // Position at 55% from the bottom

  // Draw description first (smaller text)

  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
  ctx.shadowBlur = 10;

  ctx.font = `normal 48px Paperlogy`;

  ctx.fillText(description, CANVAS_WIDTH / 2, textY);

  // Draw title below (larger, bold text)
  ctx.font = `bold 96px Paperlogy`;
  drawMultilineText(ctx, title, CANVAS_WIDTH / 2, textY + 80, 100);

  // Reset shadow
  ctx.shadowBlur = 0;
};

export const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: Area,
): Promise<string> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

  // Match dimensions of crop area
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw without any padding
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );

  return canvas.toDataURL('image/jpeg', 1.0); // Use maximum quality
};

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous'); // Handle cross-origin images
    image.src = url;
  });
