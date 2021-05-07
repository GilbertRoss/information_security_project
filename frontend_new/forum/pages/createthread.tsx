import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { VStack, Flex, Button, InputText,Input, Textarea, Heading } from '@chakra-ui/react';
import React, { useState } from 'react';
import ErrorMessage from '../components/errormessage.jsx'
import cookies from 'js-cookies'
import jwt from 'jwt-decode'
import jwtDecode from 'jwt-decode';



function CreateThread() {

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [error, setError] = useState('');
    const cookie = cookies.getItem('auth')
    const user = jwtDecode(cookie).id
    console.log(user)

    const handleSubmit = async (e : React.FormEvent) =>{
        e.preventDefault();
        let status_code = 0;
        const formData = new FormData(e.target as HTMLFormElement);
        await fetch("http://localhost:8080/createthread", {
            body: JSON.stringify({
                title: formData.get('title'),
                user_id: user,
                text: formData.get('text')
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
            return status_code
        }).catch(e => {return {"message": "Something went wrong"}})
    }
    




return (
    <form onSubmit={handleSubmit}>
   {error && <ErrorMessage message={error} />}
    <Flex width="full" align="center" justifyContent="center">
        <VStack width="500px">
        <Heading>Create Thread</Heading>
        <Input
               type="text"
               id="title"
               placeholder="Write a nice title"
               name="title"
            >
            </Input>

            <Textarea
                type="text"
                id="text"
                name="text"
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
