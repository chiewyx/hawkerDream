import WithSubnavigation from "../components/navbar";
import {
  //Square,
  Center,
  Spacer,
  //Grid,
  //GridItem,
  VStack,
  StackDivider,
  Button,
  Text,
  Flex,
  Heading,
  //Divider,
  useColorModeValue,
} from "@chakra-ui/react";

export default function LandingPage() {
  return (
    <div className="LandingPage">
      <WithSubnavigation />
      <Flex
        minH={"91.5vh"}
        align={"top"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Center>
          <VStack
            divider={<StackDivider borderColor="gray.50" />}
            spacing={4}
            align="top"
          >
            <Heading
              fontSize="4xl"
              color="black"
              fontFamily="sans-serif"
              textAlign={"center"}
            >
              One-stop solution for hawkers <Spacer /> and suppliers to connect
            </Heading>
            <Text fontSize="lg" textAlign={"center"}>
              Join HawkerTown today to gain access to <Spacer /> our invoice,
              order managing system <Spacer /> and connect with fellow hawkers
              and suppliers.
            </Text>
            <Spacer />

            <Center>
              <VStack
                divider={<StackDivider borderColor="gray.50" />}
                spacing={4}
                align="stretch"
              >
                <Button
                  colorScheme="blue"
                  variant="outline"
                  height="70px"
                  width="300px"
                  border="2px"
                >
                  Join as Hawker
                </Button>
                <Button
                  colorScheme="blue"
                  variant="outline"
                  height="70px"
                  width="300px"
                  border="2px"
                >
                  Join as Supplier
                </Button>
              </VStack>
            </Center>
          </VStack>
        </Center>
      </Flex>
    </div>
  );
}
