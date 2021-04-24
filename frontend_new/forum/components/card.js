import {Component} from 'react';
import { Box, Badge, Avatar, Wrap, WrapItem, VStack } from "@chakra-ui/react"


class Card extends Component {
    constructor(props) {
        super(props);

}
    render() {
    return (

      <Box width="1000px" height="100px"  borderWidth="1px" borderRadius="lg" overflow="hidden">
          
          <Wrap m="20px 10px" spacing="500px">
          
            <WrapItem>
             <VStack> 
            <Box
            color="black.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="24px"
            textTransform="uppercase"
            ml="2"
          >
            {this.props.title} 
          </Box>
          <Box
            color="gray.500"
            fontWeight="semibold"
            fontSize="sm"
            textTransform="uppercase"
          >
          {this.props.numberComments} response &bull;  date: {this.props.date.toGMTString()}
          </Box>
          </VStack>
           </WrapItem>
            <WrapItem>
              <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
            </WrapItem>
          </Wrap>
        </Box>


    );
}
}


export default Card;