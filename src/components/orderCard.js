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
      .match({ id: orderId });

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
              <div>
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
                  onClick={onOpen}
                >
                  Completed
                </Button>

                <AlertDialog
                  isOpen={isOpen}
                  leastDestructiveRef={cancelRef}
                  onClose={onClose}
                >
                  <AlertDialogOverlay>
                    <AlertDialogContent>
                      <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Is your order completed?
                      </AlertDialogHeader>

                      <AlertDialogBody>
                        Are you sure? You can't undo this action afterwards.
                      </AlertDialogBody>

                      <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                          Cancel
                        </Button>
                        <Button
                          colorScheme="green"
                          onClick={() => handleCompleted(info.id)}
                          ml={3}
                        >
                          Complete Order
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialogOverlay>
                </AlertDialog>
              </div>
            </div>
          </Box>
        ))}
      </Grid>
    </div>
  );
}
