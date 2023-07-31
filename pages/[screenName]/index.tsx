import { ServiceLayout } from '@/components/service_layout';
import { useAuth } from '@/contexts/auth_user.context';
import { InAuthUser } from '@/models/in_auth_user';
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Switch,
  Text,
  Textarea,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import ResizeTextarea from 'react-textarea-autosize';
import axios, { AxiosResponse } from 'axios';
import MessageItem from '@/components/message_item';

interface Props {
  userInfo: InAuthUser | null;
}

async function postMessage({
  message,
  uid,
  author,
}: {
  message: string;
  uid: string;
  author?: {
    displayName: string;
    photoURL?: string;
  };
}) {
  if (message.length <= 0) {
    return {
      result: false,
      message: '내용을 입력해주세요',
    };
  }
  try {
    await fetch(`/api/message.add`, {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        uid,
        message,
        author,
      }),
    });
    return {
      result: true,
    };
  } catch (err) {
    console.error(err);
    return {
      result: false,
      message: '등록 실패',
    };
  }
}

const UserHomePage: NextPage<Props> = function () {
  const [message, setMessage] = useState('');
  const [isAnonymous, setAnonymous] = useState(true);
  const toast = useToast();
  const { authUser } = useAuth();
  if (authUser === null) {
    return <p>사용자를 찾을 수 없습니다.</p>;
  }
  return (
    <ServiceLayout title={`${authUser.displayName}의 홈`} minH="100vh" backgroundColor="gray.50">
      <Box maxW="md" mx="auto" pt="6">
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" mb="2" bg="white">
          <Flex p="6">
            <Avatar size="lg" src={authUser.photoURL ?? 'https://bit.ly/broken-link'} mr="2" />
            <Flex direction="column" justify="center">
              <Text fontSize="md">{authUser.displayName}</Text>
              <Text fontSize="xs">{authUser.email}</Text>
            </Flex>
          </Flex>
        </Box>
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" mb="2" bg="white">
          <Flex align="center" p="2">
            <Avatar
              size="xs"
              src={isAnonymous ? 'https://bit.ly/broken-link' : authUser?.photoURL ?? 'https://bit.ly/broken-link'}
              mr="2"
            />
            <Textarea
              bg="gray.100"
              border="none"
              boxShadow="none !important"
              placeholder="어떤 이야기를 나누고 싶나요?"
              borderRadius="md"
              resize="none"
              minH="unset"
              overflow="hidden"
              fontSize="xs"
              mr="2"
              minRows={1}
              maxRows={7}
              as={ResizeTextarea}
              value={message}
              onChange={(e) => {
                if (e.target.value) {
                  const lineCount = (e.target.value.match(/[^\n]*\n[^\n]*/gi)?.length ?? 1) + 1;
                  if (lineCount > 7) {
                    toast({
                      title: '최대 7줄까지만 입력가능합니다',
                      position: 'top-right',
                    });
                    return;
                  }
                }
                setMessage(e.target.value);
              }}
            />
            <Button
              disabled={message.length === 0}
              bgColor="#FFB86C"
              color="white"
              colorScheme="yellow"
              variant="solid"
              size="sm"
              onClick={async () => {
                const postData: {
                  message: string;
                  uid: string;
                  author?: {
                    displayName: string;
                    photoURL?: string;
                  };
                } = {
                  message,
                  uid: authUser.uid,
                };
                if (isAnonymous === false) {
                  postData.author = {
                    photoURL: authUser?.photoURL ?? 'https://bit.ly/broken-link',
                    displayName: authUser?.displayName ?? 'anonymous',
                  };
                }
                const messageResp = await postMessage(postData);
                if (messageResp.result === false) {
                  toast({ title: '등록실패', position: 'top-right' });
                }
                setMessage('');
              }}
            >
              등록
            </Button>
          </Flex>
          <FormControl display="flex" alignItems="center" mt="1" mx="2" pb="2">
            <Switch
              size="sm"
              colorScheme="orange"
              id="anonymous"
              mr="1"
              isChecked={isAnonymous}
              onChange={() => {
                if (authUser === null) {
                  toast({
                    title: '로그인이 필요합니다',
                    position: 'top-right',
                  });
                  return;
                }
                setAnonymous((prev) => !prev);
              }}
            />
            <FormLabel htmlFor="anonymous" mb="0" fontSize="xx-small">
              Anonymous
            </FormLabel>
          </FormControl>
        </Box>
        <VStack spacing="12px" mt="6">
          <MessageItem
            uid="hello"
            displayName="test"
            isOwner={false}
            item={{
              id: 'test',
              message: 'test',
              createAt: '2023-07-30T16:00+09:00',
              reply: 'reply',
              replyAt: '2023-07-31T15:00+09:00',
            }}
            photoURL={authUser?.photoURL ?? ''}
          />
          <MessageItem
            uid="hello"
            displayName="test"
            isOwner={true}
            item={{
              id: 'test',
              message: 'test',
              createAt: '2023-07-30T16:00+09:00',
            }}
            photoURL={authUser?.photoURL ?? ''}
          />
        </VStack>
      </Box>
    </ServiceLayout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
  const { screenName } = query;
  if (screenName === undefined) {
    return {
      props: {
        userInfo: null,
      },
    };
  }
  try {
    const protocol = process.env.PROTOCOL || 'http';
    const host = process.env.HOST || 'localhost';
    const port = process.env.PORT || '3000';
    const baseUrl = `${protocol}://${host}:${port}`;
    const userInfoResp: AxiosResponse<InAuthUser> = await axios(`${baseUrl}/api/user.info/${screenName}`);
    return {
      props: {
        userInfo: userInfoResp.data ?? null,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        userInfo: null,
      },
    };
  }
};

export default UserHomePage;
