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

import invoice from "../invoice.jpg";
import hawkerInvoice from "../hawkerInvoice.jpg";
import WithSubnavigation from "../components/navbar";

function Invoice() {
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
          Invoice management system
        </Button>
      </Center>
      <Collapse in={isOpen} animateOpacity>
        <Box p="40px" color="black" mt="4" bg="white" rounded="md" shadow="md">
          <HStack>
            <Image
              rounded={"md"}
              alt={"feature image"}
              src={hawkerInvoice}
              boxSize="300px"
            />
            <Spacer />
            <Image
              rounded={"md"}
              alt={"feature image"}
              src={invoice}
              width={700}
              height={400}
            />
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
          alignItems={"center"}
          justifyContent={"center"}
          colorScheme="blue"
          onClick={onToggle}
        >
          {" "}
          Chat System
        </Button>
      </Center>
      <Collapse in={isOpen} animateOpacity>
        <Box p="40px" color="black" mt="4" bg="white" rounded="md" shadow="md">
          <Text>
            {" "}
            No more jumping around apps to communicate with your many different
            suppliers!
            <Spacer /> HawkerTown allows you to connect with your suppliers on{" "}
            <strong> one and only one </strong> platform!{" "}
          </Text>
          <Spacer />
          <Image
            rounded={"md"}
            alt={"feature image"}
            src={invoice}
            width={700}
            height={400}
          />
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
            <Heading>A digital Product designed for hawkers</Heading>
            <Text color={"gray.500"} fontSize={"lg"}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore
            </Text>
            <Spacer />
            <Spacer />
            <Spacer />
            <Invoice />
            <Chat />
          </Stack>
        </Center>
      </Flex>
    </div>
  );
}
