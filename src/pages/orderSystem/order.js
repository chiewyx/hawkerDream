import Simple from "../../components/profilebar";
import { Button, HStack, Spacer } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OrderCard from "../../components/orderCard";
import { supabase } from "../../supabase";

export default function Order() {
  const [profileType, setProfileType] = useState("");

  const filterButtons = async () => {
    const user = supabase.auth.user();
    const { data: pp } = await supabase
      .from("user_profiles")
      .select("profile_type")
      .eq("id", user.id)
      .single();

    setProfileType(pp.profile_type);
  };

  useEffect(() => {
    filterButtons();
  }, []);

  function Helper() {
    if (profileType === "supplier") {
      return (
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
      );
    } else {
      return (
        <HStack>
          <Spacer />
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
        </HStack>
      );
    }
  }

  return (
    <div>
      <Simple />
      <Helper />
      <OrderCard />
    </div>
  );
}
