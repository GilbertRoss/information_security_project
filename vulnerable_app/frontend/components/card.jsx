import { Component } from 'react';
import { Box, Flex, Avatar, HStack, Spacer, VStack, Link } from "@chakra-ui/react"


class Card extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <Link href={'/threads/' + this.props.threadId}>

        <Box width="1000px" height="100px" borderWidth="1px" borderRadius="lg" overflow="hidden">

          <HStack m="20px 10px">

            <HStack mr="50px">
              <Avatar name={this.props.username} />
            </HStack>
            <Flex>
              <Box
                color="black.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="24px"
                textTransform="uppercase"
                p="4"
              >
                {this.props.title}
              </Box>
              <Spacer />
              <Box
                color="gray.500"
                fontWeight="semibold"
                fontSize="sm"
                textTransform="uppercase"
                p="4"
                justify-content="left"
              >
                date: {this.props.date}
              </Box>
            </Flex>
          </HStack>
        </Box>
      </Link>
    );
  }
}


export default Card;