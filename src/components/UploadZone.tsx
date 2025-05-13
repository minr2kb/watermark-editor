import { Box, Center, Text } from '@chakra-ui/react';
import { useRef } from 'react';
import { MdAdd } from 'react-icons/md';

interface UploadZoneProps {
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadZone = ({ handleImageUpload }: UploadZoneProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box
      role="button"
      borderWidth="1px"
      borderRadius="lg"
      p={2}
      _hover={{ bg: 'gray.900' }}
      transition="all 0.2s"
      cursor="pointer"
      onClick={onClick}
      w="full"
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        multiple
        hidden
      />
      <Center width="full" aspectRatio={4 / 5} my={6} flexDir="column" gap={2}>
        <MdAdd size={32} />
        <Text>이미지 추가</Text>
      </Center>
    </Box>
  );
};

export default UploadZone;
