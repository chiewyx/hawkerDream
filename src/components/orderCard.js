import {
  Box,
  Center,
  Text,
  Button,
  Grid,
  Spacer,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { supabase } from "../supabase";

export default function OrderCard() {
  const [orderList, setOrderList] = useState([]);
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    const user = supabase.auth.user();
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
        .eq("completed", false)
        .order("id", true);

      setOrderList(orderList);
    } else {
      const { data: orderList } = await supabase
        .from("orders")
        .select("*")
        .eq("user_email", user.email)
        .eq("completed", false)
        .order("id", true);

      setOrderList(orderList);
    }
  };

  const handleCompleted = async (orderId) => {
    

  

    const { data, error } = await supabase
      .from("orders")
      .update({ completed: true })
      .eq("id", orderId);

    toast({
      title: "Order Completed",
      description: "You've completed your order",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <div>
      <Center>
        <Box bg="red" w="30%" p={4} color="white" rounded="md" align="center">
          Your orders
        </Box>
      </Center>
      <Grid templateColumns="repeat(4, 1fr)" spacing={20} px={20} gap={4}>
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
            <Grid templateColumns="repeat(2, 1fr)" gap={200}>
              <Box>
                <Grid templateColumns="repeat(1, 1fr)" gap={5}>
                  {info.item_list.map((item) => (
                    <Text> {item} </Text>
                  ))}
                </Grid>
              </Box>

              <Box>
                <Grid templateColumns="repeat(1, 1fr)" gap={5}>
                  {info.quantity.map((quantity) => (
                    <Text>{quantity}</Text>
                  ))}
                </Grid>
              </Box>
            </Grid>
            <Box> 
            <Button
              mt={10}
              w={"full"}
              bg={"green.400"}
              color={"white"}
              rounded={"xl"}
              boxShadow={"0 5px 20px 0px rgb(72 187 120 / 43%)"}
              _hover={{
                bg: "green.500",
              }}
              _focus={{
                bg: "green.500",
              }}
              // eslint-disable-next-line no-restricted-globals
              onClick={() => confirm("Are you sure this order is completed? This action is irreversible. ") ? handleCompleted(info.id) : onClose}
            >
              Completed
            </Button>
           
            </Box>
          </Box>
        ))}
      </Grid>
    </div>
  );
}
