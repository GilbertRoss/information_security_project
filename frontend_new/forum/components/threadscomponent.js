import { HStack, Avatar, VStack, Box, Flex, WrapItem} from '@chakra-ui/react';
import {Component} from 'react';


class Threadscomponent extends Component{
    constructor(props) {
        super(props);
    }

    render(){
    return(
      <Flex ml="200px" mt="100px">
      <VStack>
      <Box
        color="black"
        fontWeight="semibold"
        fontSize="24px"
      >
          {this.props.title}
      </Box>   
  <HStack>
      <Box borderWidth="1px" borderRadius="1px" width="200px" height="400">
      <VStack>
      <Avatar mt="50px" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
      </VStack>
      </Box>
      <Box>
          {this.props.threadPost}
      </Box>

  </HStack>
  </VStack>
  </Flex>
        
    )

    }
    
}

export default Threadscomponent;
