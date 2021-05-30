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
} from '@chakra-ui/react'
import { useRouter, Router } from 'next/router'

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  let router = useRouter()

  const handleSubmit = async event => {
    event.preventDefault();
    setIsLoading(true);
    try {
      let response = await userRegister({ username, password });
      console.log('response: ' + response)
      if (response != 200) {
        console.log(response)
        throw 'error'
      }
      setIsLoading(false);
      setError('')
      router.push('/registercomplete')
    } catch (e) {
      setError('Username already exists!');

      setIsLoading(false);
      setUsername('');
      setPassword('');
    }
  };

  const userRegister = async ({ username, password }) => {
    let status_code = 0
    await fetch("http://localhost:8080/users", {
      body: JSON.stringify({
        username: username,
        password_hash: password,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
      credentials: 'include'
    }
    ).then(resp => {
      resp.json()
      status_code = resp.status;
      console.log(resp)
    })
    return status_code;
  };



  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={2}>
        <Box textAlign="center">
          <Heading>Register</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleSubmit} >
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
                  'Sign Up'
                )}
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}

export default Register;