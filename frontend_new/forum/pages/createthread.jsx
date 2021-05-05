import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { VStack, Flex, Button, Input, Textarea, Heading } from '@chakra-ui/react';
import React, { useState } from 'react';
import ErrorMessage from '../components/errormessage.jsx'


function CreateThread() {

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [error, setError] = useState('');

    const handleTextChange = (e) => {
        let inputText = e.target.text;
        setText(inputText)

    }

    const handleTitleChange = (e) => {
        let inputTitle = e.target.title;
        setTitle(inputText)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
        let response = await createThread({title, text})
        if(response != 200){
            throw 'error';
        }
        } catch(err){
            setError('Please fill text area or write a title!')
        }

    }

    const createThread = async ({title, text}) => {
        let status_code = 0
        await fetch("http://localhost:8080/", {
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
        })
        return status_code;
    };



return (
    <form onSubmit={handleSubmit}>
   {error && <ErrorMessage message={error} />}
    <Flex width="full" align="center" justifyContent="center">
        <VStack width="500px">
        <Heading>Create Thread</Heading>
            <Input
               value={title}
               onChange={handleTitleChange}
               placeholder="Write a nice title"
            >
            </Input>

            <Textarea
                value={text}
                onChange={handleTextChange}
                placeholder="Type something"
                height="200px"
            />
            <Button width="full" mt={4} type="submit">
            Publish

            </Button>
        </VStack>

        
    </Flex>
    </form>

)



}


export default CreateThread;
