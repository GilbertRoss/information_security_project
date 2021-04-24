import { HStack, Avatar, Vstack, Box } from '@chakra-ui/react';
import React from 'react';
import ThreadComponent from '../../components/threadscomponent';


const  Threads = () => {
        const data = {
            title: 'This is the title',
            threadPost: 'Hello world',
        }

        return (
            <ThreadComponent title={data.title} threadPost={data.threadPost}></ThreadComponent>
        )


    
}

export default Threads;