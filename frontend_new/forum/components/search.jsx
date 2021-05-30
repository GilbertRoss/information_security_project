import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Card from './card.jsx'
import { Flex, Breadcrumb, BreadcrumbItem, VStack, Wrap, Heading, Button, HStack } from "@chakra-ui/react"
import Login from '../pages/login.jsx'
import React, { useState, useEffect } from 'react'
import Cookies from 'universal-cookie';
import ErrorMessage from '../components/errormessage.jsx'
import jwtDecode from 'jwt-decode';
import Router from 'next/router'





export default function Search() {
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [username, setUsername] = useState('')
  const cookies = new Cookies();
  const handleLogout = async () => {
    await cookies.remove('auth')
    Router.push('/')
  }

  const cookie = async () => { return cookies.get('auth') };
  const user = cookie().then((res) => {
    setUsername(jwtDecode(res).username)
    console.log(jwtDecode(res).username)
    setIsLoggedIn(true)
  }).catch(res => {
    console.log(res)
    setIsLoggedIn(false);
  })

  const ThreadsContext = React.createContext({
    threads: [], fetchThreads: () => { }
  })

  const [threads, setThreads] = useState([])
  const fetchThreads = async () => {
    const search_item = /[^/]*$/.exec(window.location.pathname)[0];
    const response = fetch("http://localhost:8080/search/?search_query=" + search_item, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
    }).then(async (response) => {
      if (response.status != 200) {
        throw 'No items found'
      }
      const threads = await response.json();
      setThreads(threads.data)
      console.log(threads.data)

    }).catch(e => {
      setError('No results found')
      console.log(e)

    })

  }

  useEffect(() => {
    fetchThreads()
  }, [])

  console.log(isLoggedIn)

  if (!isLoggedIn) {
    return (
      <Flex width="full" align="center" justifyContent="center" mt="10px">
        <VStack>

          <HStack>
            <Link href="/"><Button ml="900" variant="outline">Back</Button></Link>
            <Link href="/login"><Button ml="900" variant="outline">Sign In</Button></Link>
            <Link href="/register"><Button ml="900" variant="outline">Sign Up</Button></Link>
          </HStack>
          {error && <ErrorMessage message={error} />}
          <ThreadsContext.Provider value={{ threads, fetchThreads }}>

            {threads.map((thread) => (
              <Card title={thread.title} date={thread.date} threadId={thread.thread_id} username={thread.username}></Card>
            ))}
          </ThreadsContext.Provider>



        </VStack>
      </Flex>
    )
  }
  if (isLoggedIn) {
    return (
      <Flex width="full" align="center" justifyContent="center" mt="10px">
        <VStack>

          <HStack>
            <Link href="/"><Button ml="900" variant="outline">Back</Button></Link>
            <Heading>Welcome, {username}!</Heading>
            <Button ml="900" variant="outline" onClick={handleLogout}>Logout</Button>

          </HStack>
          {error && <ErrorMessage message={error} />}
          <ThreadsContext.Provider value={{ threads, fetchThreads }}>

            {threads.map((thread) => (
              <Card title={thread.title} date={thread.date} threadId={thread.thread_id} username={thread.username}></Card>
            ))}
          </ThreadsContext.Provider>



        </VStack>
      </Flex>
    )
  }
}
