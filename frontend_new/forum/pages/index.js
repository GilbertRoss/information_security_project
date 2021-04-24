import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Card from '../components/card'
import { Flex, Breadcrumb, BreadcrumbItem, BreadcrumbLink, VStack, Wrap, WrapItem, Button } from "@chakra-ui/react"
import Login from './login'


export default function Home() {
  const data = {
    title: "How to hack this website?",
    numberComments: "2",
    date: new Date(),
  }


  return (
    <Flex width="full" align="center" justifyContent="center" mt="10px">
    <VStack>
    <Wrap>
    
<WrapItem>

<Link href="/login"><Button ml="900" variant="outline">Sign In</Button></Link>
</WrapItem>

</Wrap>

<Card title={data.title} numberComments={data.numberComments} date={data.date}></Card>



    </VStack>
    </Flex>
  )
}
