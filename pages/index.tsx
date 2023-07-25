import { GoogleLoginButton } from '@/components/google_login_btn';
import { ServiceLayout } from '@/components/service_layout';
import FirebaseAuthClient from '@/models/firebase_client';
import { Box, Flex, Heading, Center } from '@chakra-ui/react';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { NextPage } from 'next';

const provider = new GoogleAuthProvider();

const IndexPage: NextPage = function () {
  return (
    <ServiceLayout title="test">
      <Box maxW="md" mx="auto">
        <img src="/logo.svg" alt="메인로고" />
        <Flex justify="center">
          <Heading>#Blah-Blah</Heading>
        </Flex>
      </Box>
      <Center mt="20">
        <GoogleLoginButton
          onclick={() => {
            signInWithPopup(FirebaseAuthClient.getInstance().Auth, provider)
              .then((result) => {
                console.info(result.user);
              })
              .catch((error) => {
                console.error(error);
              });
          }}
        />
      </Center>
    </ServiceLayout>
  );
};

export default IndexPage;
