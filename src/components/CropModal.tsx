import React, { useState, useCallback } from 'react';
import { Button, Box } from '@chakra-ui/react';
import Cropper from 'react-easy-crop';
import { Area } from 'react-easy-crop';
import { getCroppedImg } from '@/utils/imageProcessing';
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogBody,
  DialogBackdrop,
} from './ui/dialog';

interface CropModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  onCropComplete: (croppedImageUrl: string, cropData: Area) => void;
}

const CropModal: React.FC<CropModalProps> = ({
  isOpen,
  onClose,
  imageSrc,
  onCropComplete,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const handleCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropImage = async () => {
    if (!croppedAreaPixels) return;

    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      onCropComplete(croppedImage, croppedAreaPixels);
    } catch (e) {
      console.error('Error cropping image:', e);
    }
  };

  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      unmountOnExit
      lazyMount
    >
      <DialogBackdrop />
      <DialogContent>
        <DialogHeader>이미지 크롭</DialogHeader>
        <DialogBody>
          <Box height="400px" width="full" pos="relative">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={4 / 5}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={handleCropComplete}
              style={{
                mediaStyle: {
                  padding: 10,
                },
              }}
            />
          </Box>
        </DialogBody>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>
            취소
          </Button>
          <Button colorScheme="blue" onClick={handleCropImage}>
            적용
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default CropModal;
