import { useState } from 'react';
import { ProcessedImage, ThumbnailImage } from '@/types/image';
import {
  createCanvas,
  drawWatermark,
  drawCroppedImage,
  drawThumbnailText,
} from '@/utils/imageProcessing';
import JSZip from 'jszip';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '@/constants/image';
import { Area } from 'react-easy-crop';

const useImageProcess = () => {
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [thumbnail, setThumbnail] = useState<ThumbnailImage | null>(null);

  // 범용적인 이미지 처리 함수
  const processImage = async ({
    src,
    drawFn,
    crop,
  }: {
    src: string;
    drawFn?: (ctx: CanvasRenderingContext2D) => Promise<void>;
    crop?: Area;
  }) => {
    const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    const ctx = canvas.getContext('2d');
    if (!ctx) return src;

    const img = document.createElement('img');
    img.src = src;

    await new Promise((resolve) => {
      img.onload = resolve;
    });

    // 이미지 크롭 적용
    drawCroppedImage(ctx, img, crop);

    // 썸네일 이미지인 경우 텍스트 추가
    if (drawFn) {
      await drawFn(ctx);
    }

    return canvas.toDataURL('image/png', 1.0);
  };

  // 파일로부터 이미지 데이터 로드하는 공통 함수
  const loadImageFromFile = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages: ProcessedImage[] = [];

    for (const file of files) {
      const preview = await loadImageFromFile(file);
      const processed = await processImage({
        src: preview,
        drawFn: drawWatermark,
      });

      newImages.push({
        original: file,
        preview,
        processed,
      });
    }

    setImages([...images, ...newImages]);
  };

  const handleThumbnailUpload = async (
    file: File,
    title: string,
    description: string,
    crop?: Area,
  ) => {
    if (!file) return;

    const preview = await loadImageFromFile(file);
    const processed = await processImage({
      src: preview,
      drawFn: (ctx) => drawThumbnailText(ctx, title, description),
      crop,
    });

    setThumbnail({
      original: file,
      preview,
      processed,
      title,
      description,
      crop,
    });
  };

  const handleDownloadAll = async () => {
    const zip = new JSZip();

    // 썸네일이 있으면 먼저 추가
    if (thumbnail) {
      const imageData = thumbnail.processed.split(',')[1];
      zip.file(`thumbnail.png`, imageData, { base64: true });
    }

    // 모든 이미지를 처리
    for (let i = 0; i < images.length; i++) {
      const imageData = images[i].processed.split(',')[1];
      zip.file(`image_${i + 1}.png`, imageData, { base64: true });
    }

    // ZIP 파일 생성 및 다운로드
    const content = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = 'processed_images.zip';
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const handleDeleteImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleCropImage = async (index: number, cropData: Area) => {
    const updatedImages = [...images];
    const originalImage = updatedImages[index];

    const processedCroppedImage = await processImage({
      src: originalImage.preview,
      drawFn: drawWatermark,
      crop: cropData,
    });

    updatedImages[index] = {
      ...originalImage,
      processed: processedCroppedImage,
      crop: cropData,
    };

    setImages(updatedImages);
  };

  const handleCropThumbnail = async (cropData: Area) => {
    if (!thumbnail) return;

    const processedCroppedImage = await processImage({
      src: thumbnail.preview,
      drawFn: (ctx) =>
        drawThumbnailText(ctx, thumbnail.title, thumbnail.description),
      crop: cropData,
    });

    setThumbnail({
      ...thumbnail,
      processed: processedCroppedImage,
      crop: cropData,
    });
  };

  return {
    images,
    thumbnail,
    handleImageUpload,
    handleThumbnailUpload,
    handleDownloadAll,
    handleDeleteImage,
    handleCropImage,
    handleCropThumbnail,
  };
};

export default useImageProcess;
