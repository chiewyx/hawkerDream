import Simple from "../components/profilebar";
<<<<<<< HEAD

export default function Order() {
  return (
    <div>
      <Simple />
=======
import { Button, HStack, Spacer, } from "@chakra-ui/react";
import React, {useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase";


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
>>>>>>> 9a537b398075de4d5437be7f814da294fbd4e429
    </div>
  );
}
