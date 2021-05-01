import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Card from '../components/card.jsx'
import { Flex, Breadcrumb, BreadcrumbItem, BreadcrumbLink, VStack, Wrap, WrapItem, Button } from "@chakra-ui/react"
import Login from './login'
import React, {useState, useEffect} from 'react'


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
setThreads(threads.data)
}
useEffect(() => {
fetchThreads()
}, [])


  return (
    <Flex width="full" align="center" justifyContent="center" mt="10px">
    <VStack>
    <Wrap>
    
<WrapItem>

<Link href="/login"><Button ml="900" variant="outline">Sign In</Button></Link>
</WrapItem>

</Wrap>
<ThreadsContext.Provider value={{threads, fetchThreads}}>
      
      {threads.map((thread) => (
          <Card title={thread.title} numberComments={thread.numberComments} date={thread.date} threadId={thread.threadId} nameAvatar={thread.nameAvatar} urlAvatar={thread.urlAvatar}></Card>
        ))}      
      </ThreadsContext.Provider>



    </VStack>
    </Flex>
  )
}