import {Component} from 'react';
import { HStack, Avatar, VStack, Box} from '@chakra-ui/react';


class PostComponent extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <HStack>
      <Box shadow="md" borderWidth="1px" borderRadius="1px" width="200px" height="400px">
      <VStack>
      <Avatar size="2xl" mt="50px" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
      </VStack>
      </Box>
      <Box shadow="md" borderWidth="1px" borderRadius="1px" width="1000px" height="400px" ml="30px">
          {this.props.threadPost}
      </Box>

  </HStack>
        );
    }
}

export default PostComponent;