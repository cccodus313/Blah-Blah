import { NextPage } from 'next';
import { Box, Center, Flex, Heading } from '@chakra-ui/react';
import { ServiceLayout } from '@/components/service_layout';
import { GoogleLoginButton } from '@/components/google_login_btn';
import { useAuth } from '@/contexts/auth_user.context';

const IndexPage: NextPage = function () {
  const { signInWithGoogle } = useAuth();

  return (
    <ServiceLayout title="Blah-Blah" minH="100vh" backgroundColor="gray.50">
      <Box maxW="md" mx="auto" pt="10">
        <img src="/people-communicateer.avif" alt="메인로고" />
        <Flex justify="center">
          <Heading mt="10">#Blah-Blah</Heading>
        </Flex>
      </Box>
      <Center mt="20">
        <GoogleLoginButton onclick={signInWithGoogle} />
      </Center>
    </ServiceLayout>
  );
};

export default IndexPage;
