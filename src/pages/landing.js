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
        minH={"100vh"}
        align={"top"}
        justify={"center"}
        bgGradient="linear(to-b, orange.50, brand.90)"
      >
        <Center>
          <VStack spacing={4} align="top">
            <Text
              fontSize="5xl"
              color="orange.700"
              fontFamily="system-ui"
              textAlign={"center"}
              fontWeight="extrabold"
            >
              One-stop solution
              <Text
                fontSize="5xl"
                color="gray.700"
                fontFamily="system-ui"
                textAlign={"center"}
                fontWeight="extrabold"
              >
                for hawkers <Spacer /> and suppliers to connect{" "}
              </Text>
            </Text>
            <Text fontSize="lg" textAlign={"center"} fontWeight= "light" >
              Join HawkerTown today to gain access to our invoice,<Spacer /> 
              order managing system and connect with fellow hawkers
              and suppliers.
            </Text>
            <Spacer />
            <Spacer />
            <Center>
              <VStack spacing={4} align="stretch">
                <Button
                  colorScheme="gray.700"
                  variant="outline"
                  height="70px"
                  width="400px"
                  border="2px"
                >
                  Join as Hawker
                </Button>
                <Button
                  colorScheme="gray.700"
                  variant="outline"
                  height="70px"
                  width="400px"
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
