import { GoogleLoginButton } from '@/components/google_login_btn';
import { ServiceLayout } from '@/components/service_layout';
import { useAuth } from '@/contexts/auth_user.context';
import { Box, Flex, Heading, Center } from '@chakra-ui/react';
import { NextPage } from 'next';

const IndexPage: NextPage = function () {
  const { signInWithGoogle } = useAuth();

  return (
    <ServiceLayout title="test" minH="100vh" backgroundColor="gray.50">
      <Box maxW="md" mx="auto" pt="10">
        <img src="/main_logo.svg" alt="메인로고" />
        <Flex justify="center">
          <Heading>#Blah-Blah</Heading>
        </Flex>
      </Box>
      <Center mt="20">
        <GoogleLoginButton onclick={signInWithGoogle} />
      </Center>
    </ServiceLayout>
  );
};

export default IndexPage;
