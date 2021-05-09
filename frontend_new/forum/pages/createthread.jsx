import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { VStack, Flex, Button, InputText,Input, Textarea, Heading } from '@chakra-ui/react';
import React, { useState } from 'react';
import ErrorMessage from '../components/errormessage.jsx'
import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';



function CreateThread() {
    const cookies = new Cookies();
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [error, setError] = useState('');
   

    //const user = () => {cookies.get('auth')}.then(() => {return jwtDecode(cookie).id})
    //console.log(user)
    //const user = 
    //console.log(user)

    const handleSubmit = async (e) =>{
        e.preventDefault();
        let status_code = 0;
        const formData = new FormData(e.target);
        const cookie = async () => {return cookies.get('auth')};
        const user = cookie().then((res) => {return jwtDecode(res).id}).then((res) => {

            fetch("http://localhost:8080/createthread", {
                body: JSON.stringify({
                    title: formData.get('title'),
                    user_id: res,
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

        })
       return user
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
