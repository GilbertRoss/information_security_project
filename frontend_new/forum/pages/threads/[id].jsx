import { HStack, Avatar, Vstack, Box } from '@chakra-ui/react';
import React, {useState, useEffect} from 'react';
import ThreadComponent from '../../components/threadscomponent';


const  Threads = () => {
        

        const PostContext = React.createContext({
            posts: [], fetchPosts: () => {}
          })
        
          const [posts, setPosts] = useState([])
        const fetchPosts = async () => {
        const response = await fetch("http://localhost:8080/posts", {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            })
        const posts = await response.json()
        console.log(posts);
        setPosts(posts.data)
        }
        useEffect(() => {
        fetchPosts()
        }, [])

        return (
            <PostContext.Provider value={{posts, fetchPosts}}>
            {posts.map((post) => (
                <ThreadComponent title={post.title} date={post.date} post_text={post.post_text} username={post.username}></ThreadComponent>
                ))} 
            </PostContext.Provider>

        )


    
}

export default Threads;