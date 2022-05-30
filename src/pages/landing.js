import WithSubnavigation from "../components/navbar";
import {
  //Square,
  Center,
  Spacer,
  //Grid,
  //GridItem,
  VStack,
  Button,
  Text,
  Flex,
  Heading,
} from "@chakra-ui/react";

export default function LandingPage() {
  return (
    <div className="LandingPage">
      <WithSubnavigation />
      <Flex
        minH={"91.5vh"}
        align={"top"}
        justify={"center"}
        bgGradient="linear(to-t, yellow.100, brand.90)"
      >
        <Center>
          <VStack spacing={4} align="top">
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
            <Center>
              <VStack spacing={4} align="stretch">
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
