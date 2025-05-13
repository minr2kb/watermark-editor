import { Box, HStack, IconButton, Image, Text } from '@chakra-ui/react';
import { CloseButton } from './ui/close-button';
import { useState } from 'react';
import { MdGridOff, MdGridOn, MdCrop } from 'react-icons/md';
import CropModal from './CropModal';
import { Area } from 'react-easy-crop';
import { ProcessedImage } from '@/types/image';

interface ImageCardProps {
  index: number;
  image: ProcessedImage;
  onDelete: () => void;
  onCrop: (index: number, cropData: Area) => void;
}

// 가이드라인 컴포넌트를 분리하여 재사용
export const GuideLines = () => (
  <>
    {/* 1:1 가이드라인 */}
    <Box
      position="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      w="full"
      aspectRatio="1/1"
      borderY="1px dashed white"
      pointerEvents="none"
    />
    {/* 3:4 가이드라인 */}
    <Box
      position="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      h="full"
      aspectRatio="3/4"
      borderX="1px dashed white"
      pointerEvents="none"
    />
  </>
);

const ImageCard = ({ index, image, onDelete, onCrop }: ImageCardProps) => {
  const [showGuideLine, setShowGuideLine] = useState(false);
  const [showCropModal, setShowCropModal] = useState(false);

  const handleCropComplete = (_: string, cropData: Area) => {
    onCrop(index, cropData);
    setShowCropModal(false);
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p={2} position="relative">
      <HStack justifyContent="space-between" mb={2}>
        <Text textAlign="center">이미지 {index + 1}</Text>

        <HStack>
          <IconButton
            variant="ghost"
            aria-label="Crop"
            onClick={() => setShowCropModal(true)}
          >
            <MdCrop />
          </IconButton>
          <IconButton
            variant="ghost"
            aria-label="Toggle grid"
            onClick={() => setShowGuideLine(!showGuideLine)}
          >
            {showGuideLine ? <MdGridOff /> : <MdGridOn />}
          </IconButton>
          <CloseButton aria-label="Delete image" onClick={onDelete} />
        </HStack>
      </HStack>

      <Box position="relative">
        <Image
          src={image.processed}
          alt={`Processed ${index + 1}`}
          opacity={showGuideLine ? 0.5 : 1}
        />
        {showGuideLine && <GuideLines />}
      </Box>

      <CropModal
        isOpen={showCropModal}
        onClose={() => setShowCropModal(false)}
        imageSrc={image.preview}
        onCropComplete={handleCropComplete}
      />
    </Box>
  );
};

export default ImageCard;
