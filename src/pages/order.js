import Simple from "../components/profilebar";
import { Button, HStack, Spacer, } from "@chakra-ui/react";
import React, {useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase";
import OrderCard from "../components/orderCard"; 


export default function Order() {
  const user = supabase.auth.user();
  const session = supabase.auth.session();

  return (
    <div>
      <Simple />
      <HStack>
      <Spacer/> 
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
