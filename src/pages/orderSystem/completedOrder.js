import {
  Box,
  Center,
  Text,
  Button,
  Grid,
  Spacer,
  HStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import Simple from "../../components/profilebar";

export default function OrderCard() {
  const [orderList, setOrderList] = useState([]);
  const [profileType, setProfileType] = useState("");

  useEffect(() => {
    fetchList();
    filterButtons();
  }, []);

  const fetchList = async () => {
    const user = supabase.auth.user();
    // get the orders keyed in manually by the suppliers
    const { data: pp } = await supabase
      .from("user_profiles")
      .select("profile_type")
      .eq("id", user.id)
      .single();

    if (pp.profile_type === "supplier") {
      const { data: orderList } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .eq("completed", true)
        .order("id", true);

      setOrderList(orderList);
    } else {
      const { data: orderList } = await supabase
        .from("orders")
        .select("*")
        .eq("user_email", user.email)
        .eq("completed", true)
        .order("id", true);

      setOrderList(orderList);
    }
  };

  const filterButtons = async () => {
    const user = supabase.auth.user();
    const { data: pp } = await supabase
      .from("user_profiles")
      .select("profile_type")
      .eq("id", user.id)
      .single();

    setProfileType(pp.profile_type);
  };

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
            to="/order"
          >
            View Orders
          </Button>
        </HStack>
      );
    }
  }

  return (
    <div>
      <Simple />
      <Helper />

      <Center>
        <Box bg="red" w="30%" p={4} color="white" rounded="md" align="center">
          Your Completed Orders
        </Box>
      </Center>
      <Grid templateColumns="repeat(4, 1fr)" spacing={20} px={20} gap={6}>
        {orderList.map((info, index) => (
          <Box
            role={"group"}
            p={6}
            maxW={"2xl"}
            w={"full"}
            bg={"white"}
            boxShadow={"2xl"}
            rounded={"lg"}
            pos={"relative"}
            zIndex={1}
          >
            <div key={index}>
              <Text fontWeight="black" fontSize="3xl">
                {" "}
                #{info.id}{" "}
              </Text>
              <Spacer />
              Customer name: {info.customer_name}
              <Spacer />
              Contact number: {info.contact_number}
              <Spacer />
              Delivery date: {info.delivery_date}
              <Spacer />
              Address: {info.delivery_address}
              <Spacer />
              Total Amount: ${info.total_cost}
              <Box bg="white" w="100%" p={4} color="white"></Box>
              <Grid templateColumns="repeat(2, 1fr)" gap={50}>
                <Box>
                  {info.item_list.map((item) => (
                    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                      {item}
                    </Grid>
                  ))}
                </Box>

                <Box>
                  {info.quantity.map((quantity) => (
                    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                      {quantity}
                    </Grid>
                  ))}
                </Box>
              </Grid>
            </div>
          </Box>
        ))}
      </Grid>
    </div>
  );
}
