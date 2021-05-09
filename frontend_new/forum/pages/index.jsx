import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Card from '../components/card.jsx'
import { Flex, Breadcrumb, BreadcrumbItem, BreadcrumbLink, VStack, Wrap, WrapItem, Button, HStack } from "@chakra-ui/react"
import Login from './login.jsx'
import React, {useState, useEffect} from 'react'
import cookies from 'js-cookies';



export default function Home() {
  

  const ThreadsContext = React.createContext({
    threads: [], fetchThreads: () => {}
  })

  const [threads, setThreads] = useState([])
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


  return (
    <Flex width="full" align="center" justifyContent="center" mt="10px">
    <VStack>
    <HStack>
    

<Link href="/login"><Button ml="900" variant="outline">Sign In</Button></Link>
<Link href="/register"><Button ml="900" variant="outline">Sign Up</Button></Link>

</HStack>
<ThreadsContext.Provider value={{threads, fetchThreads}}>
      
      {threads.map((thread) => (
          <Card title={thread.title} date={thread.date} threadId={thread.thread_id} username={thread.username}></Card>
        ))}      
      </ThreadsContext.Provider>



    </VStack>
    </Flex>
  )
}
