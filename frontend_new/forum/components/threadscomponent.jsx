import { VStack, HStack, Box, Textarea, Button, Spacer, Flex} from '@chakra-ui/react';
import {Component} from 'react';
import PostComponent from './postcomponent.jsx';



class Threadscomponent extends Component{
    constructor(props) {
        super(props);
    }

  

    render(){

      
      
    return(
      <VStack  mt="100px">
      <VStack>
      <HStack>
      <Box color="black"
        fontWeight="semibold"
        fontSize="16px"
        p={4}>
          Back</Box>
      <Spacer />
      <Spacer />
      <Box
        color="black"
        fontWeight="semibold"
        fontSize="24px"
        p={4}
      >
        {this.props.title}
        
         </Box>
      </HStack> 
      <PostComponent date={this.props.date} post_text={this.props.post_text} username={this.props.username}></PostComponent>
      <HStack width="1210px">
      <Textarea placeholder="Answer to this thread" />
      <Button colorScheme="teal" variant="outline">
    Post
  </Button>
  </HStack>
  </VStack>
  </VStack>
        
    )

    }
    
}

export default Threadscomponent;
