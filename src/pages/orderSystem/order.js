import Simple from "../../components/profilebar";
import { Button, HStack, Spacer } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import OrderCard from "../../components/orderCard";

export default function Order() {
  return (
    <div>
      <Simple />
      <HStack>
        <Button
          bg={"blue.400"}
          rounded={"full"}
          color={"white"}
          _hover={{ bg: "blue.500" }}
          as={Link}
          to="/order/completedorders"
        >
          View completed orders
        </Button>
        <Spacer />
        <Button
          bg={"blue.400"}
          rounded={"full"}
          color={"white"}
          _hover={{ bg: "blue.500" }}
          as={Link}
          to="/order/updateorder"
        >
          Update Order List
        </Button>

        <Button
          bg={"blue.400"}
          rounded={"full"}
          color={"white"}
          _hover={{ bg: "blue.500" }}
          as={Link}
          to="/order/addorder"
        >
          Add order
        </Button>
      </HStack>

      <OrderCard />
    </div>
  );
}
