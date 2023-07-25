import { Box, Button } from '@chakra-ui/react';

interface Props {
  onclick: () => void;
}

export const GoogleLoginButton = function ({ onclick }: Props) {
  return (
    <Box>
      <Button
        size="lg"
        width="full"
        maxW="md"
        borderRadius="full"
        bgColor="#4285f4"
        color="white"
        colorScheme="blue"
        leftIcon={<img src="/google.svg" alt="google로고" style={{ backgroundColor: 'white', padding: '8px' }} />}
        onClick={onclick}
      >
        Google 계정으로 시작하기
      </Button>
    </Box>
  );
};
