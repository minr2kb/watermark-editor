import { Area } from 'react-easy-crop';

export interface ProcessedImage {
  original: File;
  preview: string;
  processed: string;
  crop?: Area;
}

export interface ThumbnailImage extends ProcessedImage {
  title: string;
  description: string;
}
