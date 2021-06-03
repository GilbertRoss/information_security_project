import React, { useState } from 'react';
import ErrorMessage from '../components/errormessage.jsx'
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  CircularProgress,
  HStack,
  Link
} from '@chakra-ui/react'
import { useRouter } from 'next/router'


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter()


  const handleSubmit = async event => {
    event.preventDefault();
    setIsLoading(true);
    try {
      let response = await userLogin({ username, password });
      if (response != 200) {
        throw 'Invalid Credentials'
      }
      console.log(response)
      setIsLoading(false);
      setError('')
      router.push('/')
    } catch (e) {
      setError('Invalid credentials');
      setIsLoading(false);
      setUsername('');
      setPassword('');
    }
  };

  const userLogin = async ({ username, password }) => {
    let status_code = 0
    await fetch("http://localhost:8080/token", {
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
      credentials: 'include'
    }

    ).then(resp => {
      status_code = resp.status;


    })
    return status_code
  };



  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={2}>
        <Box textAlign="center">
          <HStack>
            <Link href={'/'}>
              <Box color="black"
                fontWeight="semibold"
                fontSize="16px"
                p={4}>
                Back</Box>
            </Link>
            <Heading>Login</Heading>
          </HStack>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleSubmit}>
            {error && <ErrorMessage message={error} />}
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input type="text" value={username} onChange={event => setUsername(event.currentTarget.value)} placeholder="iAmNotAH4cker" />
            </FormControl>
            <FormControl mt={6} isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password} onChange={event => setPassword(event.currentTarget.value)} placeholder="*******" />
            </FormControl>
            <Button width="full" mt={4} type="submit">
              {isLoading ? (
                <CircularProgress isIndeterminate size="24px" color="teal" />
              ) : (
                  'Sign In'
                )}
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}

export default Login;