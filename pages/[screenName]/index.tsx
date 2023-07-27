import { ServiceLayout } from '@/components/service_layout';
import { Avatar, Box, Button, Flex, Text, Textarea, useToast } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useState } from 'react';
import ResizeTextarea from 'react-textarea-autosize';

const userInfo = {
  uid: 'test',
  email: 'cccodus313@gmail.com',
  displayName: 'park chae yeon',
  photoURI: '',
};
const UserHomePage: NextPage = function () {
  const [message, setMessage] = useState('');
  const toast = useToast();
  return (
    <ServiceLayout title="user home" minH="100vh" backgroundColor="gray.50">
      ;
      <Box maxW="md" mx="auto" pt="6">
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" mb="2" bg="white">
          <Flex p="6">
            <Avatar size="lg" src={userInfo.photoURI} mr="2" />
            <Flex direction="column" justify="center">
              <Text fontSize="md">{userInfo.displayName}</Text>
              <Text fontSize="xs">{userInfo.email}</Text>
            </Flex>
          </Flex>
        </Box>
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" mb="2" bg="white">
          <Flex align="center" p="2">
            <Avatar size="xs" src="https://bit.ly/broken-link" mr="2" />
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
              maxRows={7}
              as={ResizeTextarea}
              value={message}
              onChange={(e) => {
                if (e.currentTarget.value) {
                  const lineCount = (e.target.value.match(/[^\n]*\n[^\n]*/gi)?.length ?? 1) + 1;
                  if (lineCount > 7) {
                    toast({
                      title: '최대 7줄까지만 입력가능합니다',
                      position: 'top-right',
                    });
                    return;
                  }
                }
                setMessage(e.currentTarget.value);
              }}
            />
            <Button
              disabled={message.length === 0}
              bgColor="#FFB86C"
              color="white"
              colorScheme="yellow"
              variant="solid"
              size="sm"
            >
              등록
            </Button>
          </Flex>
        </Box>
      </Box>
    </ServiceLayout>
  );
};

export default UserHomePage;
