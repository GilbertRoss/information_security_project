import { VStack, HStack, Box, Textarea, Button, Spacer, Link } from '@chakra-ui/react';
import React, { Component, useState } from 'react';
import PostComponent from './postcomponent.jsx';
import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';
import { isEmpty } from '@chakra-ui/utils';
import Router from 'next/router'



class Threadscomponent extends Component {
  state = {}
  constructor(props) {
    super(props);
    this.fetchPosts().then(posts => this.setState({ posts: posts }))
  }


  async fetchPosts() {
    let id = /[^/]*$/.exec(window.location.pathname)[0];
    console.log(id)
    const response = await fetch("http://localhost:8080/posts/?thread_id=" + id, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
    })
    const posts = await response.json()

    return posts
  }







  render() {




    const handleSubmit = async (e) => {
      e.preventDefault();
      const cookies = new Cookies();
      let status_code = 0;
      const formData = new FormData(e.target);
      const cookie = async () => { return cookies.get('auth') };
      let id = /[^/]*$/.exec(window.location.pathname)[0];
      const user = cookie().then((res) => { return jwtDecode(res).id }).then((res) => {

        fetch("http://localhost:8080/createpost", {
          body: JSON.stringify({
            user_id: res,
            text: formData.get('text'),
            thread_id: id
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
          Router.reload();
          return status_code
        }).catch(e => {
          return { "message": "Something went wrong" }
        })

      }).catch(e => Router.push('/login'))
      return user
    }


    if (isEmpty(this.state)) {
      return <div>Loading...</div>
    }


    return (
      <VStack mt="100px">
        <VStack>
          <HStack>
            <Link href={'/'}>
              <Box color="black"
                fontWeight="semibold"
                fontSize="16px"
                p={4}>
                Back</Box>
            </Link>
            <Spacer />
            <Spacer />
            <Box
              color="black"
              fontWeight="semibold"
              fontSize="24px"
              p={4}
            >
              {console.log(this.state)}
              {this.state.posts.data[0].title}
            </Box>
          </HStack>
          {this.state.posts.data.map((post) => (
            <PostComponent date={post.date} post_text={post.post_text} username={post.username}>
            </PostComponent>
          ))}
          <form onSubmit={handleSubmit}>
            <HStack width="1210px">
              <Textarea placeholder="Answer to this thread" type="text" id="text" name="text" />
              <Button colorScheme="teal" variant="outline" type="submit">
                Post
  </Button>
            </HStack>
          </form>
        </VStack>
      </VStack>

    )

  }

}

export default Threadscomponent;
