import {Component} from 'react';
import { Box, Flex, Avatar, HStack, Spacer, VStack, Link } from "@chakra-ui/react"


class Card extends Component {
    constructor(props) {
        super(props);

}
    render() {
    return (
      <Link href={'/threads/' + this.props.threadId}>

      <Box width="1000px" height="100px"  borderWidth="1px" borderRadius="lg" overflow="hidden">
          
          <HStack m="20px 10px" spacing="500px">
          
             <Flex>
             <HStack mr="50px">
              <Avatar name="Sadman" />
            </HStack> 
            <Box
            color="black.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="24px"
            textTransform="uppercase"
            postion= "absolute"
            align= "self-start"
          >
            {this.props.title} 
          </Box>
          <Spacer />
          <Flex
            color="gray.500"
            fontWeight="semibold"
            fontSize="sm"
            textTransform="uppercase"
            align="self-start"
          >
          date: {this.props.date}
          </Flex>
          </Flex>
        </HStack>
        </Box>
        </Link>
    );
}
}


export default Card;