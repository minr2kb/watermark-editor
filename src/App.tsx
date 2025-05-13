import {
  Box,
  Button,
  VStack,
  SimpleGrid,
  Text,
  Container,
} from '@chakra-ui/react';
import UploadZone from '@/components/UploadZone';
import ThumbnailEditor from '@/components/ThumbnailEditor';
import useImageProcess from '@/hooks/useImageProcess';
import ImageCard from './components/ImageCard';
import { MdDownload } from 'react-icons/md';

function App() {
  const {
    images,
    thumbnail,
    handleImageUpload,
    handleThumbnailUpload,
    handleDownloadAll,
    handleDeleteImage,
    handleCropImage,
    handleCropThumbnail,
  } = useImageProcess();

  return (
    <Container px={0}>
      <Box
        position="sticky"
        top={0}
        zIndex={1}
        w="full"
        bg="bg"
        borderBottomWidth="1px"
        borderColor="gray.600"
      >
        <Box
          w="full"
          p={4}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          maxW="960px"
          mx="auto"
        >
          <Text fontSize="xl" fontWeight="bold">
            바공 워터마크 에디터
          </Text>

          <Button
            onClick={handleDownloadAll}
            colorScheme="green"
            size="md"
            disabled={images.length === 0 && !thumbnail}
          >
            전체 다운로드
            <MdDownload size={20} />
          </Button>
        </Box>
      </Box>

      <VStack gap={4} w="full" p={4} maxW="960px" mx="auto">
        <ThumbnailEditor
          image={thumbnail}
          handleThumbnailUpload={handleThumbnailUpload}
          handleCropThumbnail={handleCropThumbnail}
        />
        <SimpleGrid
          w="full"
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          gap={4}
        >
          {images.map((image, index) => (
            <ImageCard
              key={index}
              image={image}
              index={index}
              onDelete={() => handleDeleteImage(index)}
              onCrop={handleCropImage}
            />
          ))}
          <UploadZone handleImageUpload={handleImageUpload} />
        </SimpleGrid>
      </VStack>
    </Container>
  );
}

export default App;
