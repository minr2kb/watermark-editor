import {
  Box,
  Text,
  Image,
  Button,
  Flex,
  Stack,
  Textarea,
  Input,
  Center,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import {
  MdCheck,
  MdCrop,
  MdEdit,
  MdGridOff,
  MdGridOn,
  MdImage,
} from 'react-icons/md';
import { ThumbnailImage } from '@/types/image';
import CropModal from './CropModal';
import { Area } from 'react-easy-crop';
import { GuideLines } from './ImageCard';

interface ThumbnailEditorProps {
  image: ThumbnailImage | null;
  handleThumbnailUpload: (
    file: File,
    title: string,
    description: string,
    crop?: Area,
  ) => void;
  handleCropThumbnail: (cropData: Area) => void;
}

const ThumbnailEditor = ({
  image,
  handleThumbnailUpload,
  handleCropThumbnail,
}: ThumbnailEditorProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState('제목');
  const [description, setDescription] = useState('부제목');
  const [showCropModal, setShowCropModal] = useState(false);
  const [showGuideLine, setShowGuideLine] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleThumbnailUpload(file, title, description);
    }
  };

  const handleApply = () => {
    if (image?.original) {
      handleThumbnailUpload(image.original, title, description, image.crop);
    }
  };

  const handleCropComplete = (_: string, cropData: Area) => {
    setShowCropModal(false);
    handleCropThumbnail(cropData);
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={6}
      w="full"
      bg="gray.950"
      boxShadow="sm"
    >
      <Text fontSize="lg" fontWeight="bold" mb={5}>
        썸네일 편집
      </Text>

      <Flex direction={{ base: 'column', md: 'row' }} gap={6} align="start">
        <Box
          role="button"
          borderWidth="1px"
          borderRadius="lg"
          borderStyle="dashed"
          transition="all 0.2s"
          cursor="pointer"
          onClick={() => fileInputRef.current?.click()}
          position="relative"
          w={300}
          aspectRatio={4 / 5}
          _hover={{ bg: 'gray.700' }}
          overflow="hidden"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            hidden
          />

          {image?.processed ? (
            <Box position="relative" w="full" h="full">
              <Image
                src={image.processed}
                alt="Thumbnail preview"
                w="full"
                h="full"
                objectFit="cover"
                opacity={showGuideLine ? 0.5 : 1}
              />
              {showGuideLine && <GuideLines />}
              <Center
                position="absolute"
                top={0}
                right={0}
                bottom={0}
                left={0}
                bg="blackAlpha.600"
                opacity={0}
                _hover={{ opacity: 1 }}
                transition="opacity 0.2s"
                cursor="pointer"
              >
                <MdEdit size={24} />
              </Center>
            </Box>
          ) : (
            <Flex
              w="full"
              h="full"
              justify="center"
              align="center"
              flexDir="column"
              gap={3}
              p={4}
              textAlign="center"
            >
              <Box bg="gray.700" p={3} borderRadius="full">
                <MdImage size={32} />
              </Box>
              <Text fontWeight="medium">썸네일 이미지 추가</Text>
              <Text fontSize="sm" color="gray.500">
                이미지를 클릭하여 업로드하세요
              </Text>
            </Flex>
          )}
        </Box>

        <Stack flex={1} w="full" gap={6}>
          <Box w="full">
            <Text mb={2} fontWeight="medium">
              제목
            </Text>
            <Textarea
              variant={'outline'}
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              size="md"
              rows={2}
              resize="none"
            />
          </Box>

          <Box w="full">
            <Text mb={2} fontWeight="medium">
              부제목
            </Text>
            <Input
              variant={'outline'}
              placeholder="부제목을 입력하세요"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              size="md"
            />
          </Box>

          <Stack direction="row" w="full" justify="flex-end" gap={4}>
            <Button
              variant="surface"
              disabled={!image?.processed}
              gap={2}
              onClick={() => setShowGuideLine(!showGuideLine)}
            >
              {showGuideLine ? <MdGridOn /> : <MdGridOff />}
              그리드 {showGuideLine ? '보기' : '숨김'}
            </Button>
            <Button
              variant="surface"
              disabled={!image?.processed}
              gap={2}
              onClick={() => setShowCropModal(true)}
            >
              <MdCrop size={20} />
              크롭하기
            </Button>
            <Button
              disabled={!image?.processed || !title}
              onClick={handleApply}
              gap={2}
            >
              <MdCheck size={20} />
              적용하기
            </Button>
          </Stack>
        </Stack>
      </Flex>

      {image?.original && (
        <CropModal
          isOpen={showCropModal}
          onClose={() => setShowCropModal(false)}
          imageSrc={image.preview}
          onCropComplete={handleCropComplete}
        />
      )}
    </Box>
  );
};

export default ThumbnailEditor;
