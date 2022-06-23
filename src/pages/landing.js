import WithSubnavigation from "../components/navbar";
import {
  //Square,
  Center,
  Spacer,
  Grid,
  //GridItem,
  VStack,
  Button,
  Text,
  Flex,
  Image,
  HStack,
} from "@chakra-ui/react";
import invoice from "../invoice.jpg";
import marketplace from "../marketplace.jpg";
import order from "../order.jpg";
import { Box } from "@chakra-ui/react";

function Headers() {
  return (
    <Flex
      minH={"100vh"}
      align={"top"}
      justify={"center"}
      bgGradient="linear(to-b, brand.90, orange.50)"
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
          <Spacer />
          <Text fontSize="lg" textAlign={"center"} fontWeight="light">
            Join HawkerTown today to gain access to our invoice,
            <Spacer />
            order managing system and connect with fellow hawkers and suppliers.
          </Text>
          <Spacer />
          <Spacer />
          <Center></Center>
          <Spacer />
        </VStack>
      </Center>
    </Flex>
  );
}

function FeaturesHawker() {
  return (
    <section id="section-two">
      <Box bg="orange.50" w="100%" p={20} color="white">
        <Spacer />
      </Box>
      <HStack spacing="24px" align="start">
        <Spacer spacing="30px" />
        <VStack align={"flex-start"} spacing="50">
          <Text fontWeight={"black"} fontFamily="system-ui" fontSize={"5xl"}>
            Store invoices digitally
            <Text fontWeight={"light"} fontFamily="system-ui" fontSize={"md"}>
              Our Invoice Management System helps you to save and <Spacer />{" "}
              organise your invoices digitally and you can easily find{" "}
              <Spacer /> the invoice you want as it is organised by months and
              suppliers.
            </Text>
          </Text>
          <Text fontWeight={"black"} fontFamily="system-ui" fontSize={"5xl"}>
            User-friendly
            <Text fontWeight={"light"} fontFamily="system-ui" fontSize={"md"}>
              We will calculate your total expenses of the month for you{" "}
              <Spacer />
              and you can view it easily at the dashboard!
            </Text>
          </Text>
          <Spacer />
        </VStack>
        <Spacer />
        <Image
          rounded={"md"}
          alt={"feature image"}
          src={invoice}
          width={500}
          height={300}
          shadow="base"
        />
        <Spacer />
      </HStack>
    </section>
  );
}

function FeaturesSupplier() {
  return (
    <section id="section-three">
      <Box bg="orange.50" w="100%" p={20} color="white">
        <Spacer />
      </Box>
      <HStack spacing="24px" align="start">
        <Spacer spacing="30px" />
        <VStack align={"flex-start"}>
          <Text
            fontWeight={"extrabold"}
            fontFamily="system-ui"
            fontSize={"5xl"}
          >
            Digitalise your business
            <Text fontWeight={"light"} fontFamily="system-ui" fontSize={"md"}>
              Manage your orders digitally and not miss out on any of your
              orders! No longer <Spacer /> need to dig through messages sent by
              your customers to find the order, <Spacer /> orders made from your
              customers can be easily accessed in HawkerTown
            </Text>
          </Text>
          <Spacer />
          <Spacer />
          <Text
            fontWeight={"extrabold"}
            fontFamily="system-ui"
            fontSize={"5xl"}
          >
            User-friendly
          </Text>
          <Text fontWeight={"light"} fontFamily="system-ui" fontSize={"md"}>
            You can now easily check if you have any incomplete orders{" "}
            <Spacer /> and update the status of your orders
          </Text>
        </VStack>
        <Spacer />
        <Image
          rounded={"md"}
          alt={"feature image"}
          src={order}
          width={500}
          height={300}
          shadow="base"
        />
        <Spacer />
      </HStack>
    </section>
  );
}

function Marketplace() {
  return (
    <section id="section-four">
    <Box bg="orange.50" w="100%" p={20} color="white">
        <Spacer />
      </Box>
      <HStack spacing="24px" align="start">
        <Spacer spacing="30px" />
        <VStack align={"flex-start"}>
          <Text fontWeight={"black"} fontFamily="system-ui" fontSize={"5xl"}>
            Platform to connect
          </Text>
          <Spacer />
          <Spacer />
          <Text fontWeight={"light"} fontFamily="sans-serif" fontSize={"md"}>
            Suppliers: List your products on the platform for hawkers to view
          </Text>
          <Text fontWeight={"light"} fontFamily="sans-serif" fontSize={"md"}>
            Hawkers: Search the products you wish to instock and <Spacer />{" "}
            compare the prices among different suppliers to get the most
            competitive price
          </Text>
        </VStack>
        <Spacer />
        <Image
          rounded={"md"}
          alt={"feature image"}
          src={marketplace}
          width={500}
          height={300}
          shadow="base"
        />
        <Spacer />
      </HStack>
    </section>
  );
}

export default function LandingPage() {
  return (
    <div className="LandingPage">
      <WithSubnavigation />
      <Headers />
      <Grid minH={"100vh"} bg="orange.50" templateRow="repeat(5, 1fr)" gap={20}>
        <FeaturesHawker />
        <Spacer />
        <FeaturesSupplier />
        <Spacer />
        <Spacer />
        <Marketplace />
        <Spacer />
        <Spacer />
      </Grid>
    </div>
  );
}
