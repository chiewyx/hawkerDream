import {
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  useDisclosure,
  Button,
  Collapse,
  Box,
  Center,
  Spacer,
  HStack,
} from "@chakra-ui/react";

import order from "../order.jpg";
import speechbubble from "../test.jpg";

import WithSubnavigation from "../components/navbar";

function Orders() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <Center>
        <Button
          height="50px"
          width="300px"
          variant="outline"
          colorScheme="blue"
          onClick={onToggle}
        >
          {" "}
          Order management system
        </Button>
      </Center>
      <Collapse in={isOpen} animateOpacity>
        <Box p="40px" color="black" mt="4" bg="white" rounded="md" shadow="md">
          <Spacer />
          <HStack>
            <Image
              rounded={"md"}
              alt={"feature image"}
              src={order}
              width={700}
              height={400}
            />
            <Box>
              <Spacer />
              <Spacer />
              <Image
                rounded={"md"}
                alt={"feature image"}
                src={speechbubble}
                boxSize="300px"
              />
            </Box>
          </HStack>
        </Box>
      </Collapse>
    </>
  );
}

function Chat() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <Center>
        <Button
          height="50px"
          width="300px"
          variant="outline"
          colorScheme="blue"
          onClick={onToggle}
        >
          Chat System
        </Button>
      </Center>
      <Collapse in={isOpen} animateOpacity>
        <Box p="40px" color="black" mt="4" bg="white" rounded="md" shadow="md">
          <Text>
            No more jumping around apps to communicate with your customers!
            <Spacer /> HawkerTown allows you to connect with your suppliers on{" "}
            <strong> one and only one </strong> platform!{" "}
          </Text>
        </Box>
      </Collapse>
    </>
  );
}

export default function SplitWithImage() {
  return (
    <div>
      <WithSubnavigation />
      <Flex
        minH={"100vh"}
        align={"top"}
        justify={"center"}
        bgGradient="linear(to-b, orange.50, brand.90)"
      >
        <Center>
          <Stack spacing={4}>
            <Text
              textTransform={"uppercase"}
              color={"blue.400"}
              fontWeight={600}
              fontSize={"sm"}
              bg={useColorModeValue("blue.50", "blue.900")}
              p={2}
              alignSelf={"flex-start"}
              rounded={"md"}
            >
              Our Features
            </Text>
            <Heading>A digital Product designed for suppliers</Heading>
            <Text color={"gray.500"} fontSize={"lg"}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore
            </Text>
            <Spacer />
            <Spacer />
            <Spacer />

            <Orders />

            <Chat />
          </Stack>
        </Center>
      </Flex>
    </div>
  );
}
