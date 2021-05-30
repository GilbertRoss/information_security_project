import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
import Card from '../components/card.jsx'
import { Flex, Heading, Box, Spacer, VStack, Wrap, Input, Button, HStack, useControllableState } from "@chakra-ui/react"
import Login from './login.jsx'
import React, { useState, useEffect } from 'react'
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom'
import jwtDecode from 'jwt-decode';




export default function Home() {
  const cookies = new Cookies();
  const router = useRouter()
  const ThreadsContext = React.createContext({
    threads: [], fetchThreads: () => { }
  })

  const [threads, setThreads] = useState([])
  const [toPage, setToPage] = useState(false)
  const [pageUrl, setPageUrl] = useState()
  const [username, setUsername] = useState()
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  const handleLogout = async () => {
    await cookies.remove('auth')
    router.push('/')
  }

  const cookie = async () => { return cookies.get('auth') };
  const user = cookie().then((res) => {
    setUsername(jwtDecode(res).username)
    setIsLoggedIn(true)
  }).catch(res => {
    setIsLoggedIn(false);
  })

  const fetchThreads = async () => {
    const response = await fetch("http://localhost:8080/threads", {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
    })
    const threads = await response.json()
    console.log(threads);
    setThreads(threads.data)
  }
  useEffect(() => {
    fetchThreads()
  }, [])

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    router.push("/search/" + formData.get("search"))
  }

  if (!isLoggedIn) {
    return (
      <>

        <Flex ml="20px" mr="20px" mt="20px">
          <Box p="2">
            <Heading size="md">Forum App</Heading>
          </Box>
          <Spacer />
          <HStack>
            <Link href="/login"><Button ml="900" variant="outline">Sign In</Button></Link>

            <Link href="/register"><Button ml="900" variant="outline">Sign Up</Button></Link>
          </HStack>
        </Flex>
        <Flex width="full" align="center" justifyContent="center">
          <HStack>
            <form onSubmit={handleSearch}>
              <Input width="400px" variant="flushed" placeholder="Search" name="search" type="text" id="search" />
              <Button ml="10px" variant="outline" type="submit" >Search</Button>
            </form>
          </HStack>
        </Flex>
        <Flex width="full" align="center" justifyContent="center" mt="10px">
          <VStack>
            <ThreadsContext.Provider value={{ threads, fetchThreads }}>

              {threads.map((thread) => (
                <Card title={thread.title} date={thread.date} threadId={thread.thread_id} username={thread.username}></Card>
              ))}
            </ThreadsContext.Provider>



          </VStack>
        </Flex>
      </>
    )
  }
  if (isLoggedIn) {
    console.log("logged in")
    return (
      <>

        <Flex ml="20px" mr="20px" mt="20px">
          <Box p="2">
            <Heading size="md">Forum App</Heading>
          </Box>
          <Spacer />
          <HStack>
            <Heading>Welcome, {username}!</Heading>
            <Link href="/createthread"><Button ml="900" variant="outline">Create Thread</Button></Link>
            <Button ml="900" variant="outline" onClick={handleLogout}>Logout</Button>
          </HStack>
        </Flex>
        <Flex width="full" align="center" justifyContent="center">
          <HStack>
            <form onSubmit={handleSearch}>
              <Input width="400px" variant="flushed" placeholder="Search" name="search" type="text" id="search" />
              <Button ml="10px" variant="outline" type="submit" >Search</Button>
            </form>
          </HStack>
        </Flex>
        <Flex width="full" align="center" justifyContent="center" mt="10px">
          <VStack>
            <ThreadsContext.Provider value={{ threads, fetchThreads }}>

              {threads.map((thread) => (
                <Card title={thread.title} date={thread.date} threadId={thread.thread_id} username={thread.username}></Card>
              ))}
            </ThreadsContext.Provider>



          </VStack>
        </Flex>
      </>
    )
  }
}
