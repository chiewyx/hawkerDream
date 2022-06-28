import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Button,
  Grid,
  Spacer,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import folder from "../folder.svg";
import { useState, useEffect } from "react";
import { supabase } from "../supabase";

export default function ProductSimple(props) {
  const user = supabase.auth.user();
  const [orderList, setOrderList] = useState([]);
  const toast = useToast(); 

  const fetchList = async () => {
    // get the orders keyed in manually by the suppliers
    const { data: orderList } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", user.id)
      .eq("completed", false)
      .order("id", true);

    setOrderList(orderList);
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleCompleted = async (orderId) => {
   const {data, error} = await supabase
      .from("orders")
      .update({ completed: true })
      .match({ id: orderId })
      
    toast({
      title: "Order Completed",
      description: "You've Completed your order",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <div>
      <Center>
        <Box bg="red" w="30%" p={4} color="white" rounded="md" align="center">
          Incomplete orders
        </Box>
      </Center>
      <Grid templateColumns="repeat(4, 1fr)" spacing={20} px={20} gap={6}>
        {orderList.map((info, index) => (
          <Box
            role={"group"}
            p={6}
            maxW={"330px"}
            w={"full"}
            bg={"white"}
            boxShadow={"2xl"}
            rounded={"lg"}
            pos={"relative"}
            zIndex={1}
          >
            <div key={index}>
             <Text fontWeight="black" fontSize="3xl"> # {info.id} </Text>
              <Spacer /> 
              {info.customer_name}
              <Spacer />
              {info.contact_number}
              <Spacer />
              {info.delivery_date}
              <Spacer />
              {info.delivery_address}
              <Spacer />
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
              <Button size="sm" onClick={() => handleCompleted(info.id)} > Completed </Button>
            </div>
          </Box>
        ))}
      </Grid>
    </div>
  );
}
