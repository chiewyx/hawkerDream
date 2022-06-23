import Simple from "../components/profilebar";
import {
  FormControl,
  Grid,
  IconButton,
  Input,
  Stack,
  HStack,
  Box,
  Flex,
  Button,
  Text,
  Link,
  useToast,
  useColorModeValue,
  FormLabel
} from "@chakra-ui/react";

import { MinusIcon, AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { supabase } from "../supabase";

export default function AddOrder() {
  const [list, setList] = useState([]);
  const user = supabase.auth.user();
  const [checked, setChecked] = useState([]);
  const toast = useToast();

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    const { data: itemList } = await supabase
      .from("orderList")
      .select("*")
      .order("item", true);

    setList(itemList);
  };

  // Add/Remove checked item from list
  const handleCheck = (event) => {
    const updatedList = [...checked];

    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  async function insertForm() {}

  return (
    <div>
      <Simple />
      <form onSubmit={insertForm}>
        <Flex
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          <Stack
            spacing={4}
            w={"full"}
            maxW={"xl"}
            bg={useColorModeValue("white", "gray.700")}
            rounded={"xl"}
            boxShadow={"lg"}
            p={6}
            my={12}
          >
            <Grid templateColumns="repeat(2,1fr)" gap={6}>
              <label for="customerName"> Customer Name </label>
              <input type="text" name="customerName" id="customerName" />

              <label for="contactNum"> Contact Number </label>
              <input type="int" name="contactNum" id="contactNum" />

              <label for="deliveryAddress"> Delivery Address</label>
              <input type="text" name="deliveryAddress" id="deliveryAddress" />

              <label for="deliveryDate"> Delivery Date</label>
              <input type="date" name="deliveryDate" id="deliveryDate" />
            </Grid>

            <Grid templateColumns="repeat(2,1fr)" gap={6}>
              <text> Item </text>
              <text> Quantity </text>
            </Grid>

            {list.map((item, index) => (
              <div key={index}>
                <Grid templateColumns="repeat(2,1fr)" gap={5}>
                  <Box>
                    <input
                      value={item.item}
                      type="checkbox"
                      onChange={handleCheck}
                    />
                    {item.item}
                  </Box>

                  <input type="int" name="deliveryDate" id="deliveryDate" />

                  
                </Grid>
              </div>
            ))}

            <Button
              bg={"blue.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "blue.500",
              }}
              type="submit"
              onClick={() =>
                toast({
                  title: "Order uploaded",
                  description: "You've uploaded your invoice successfully",
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                })
              }
            >
              Upload order
            </Button>
          </Stack>
        </Flex>
      </form>
    </div>
  );
}
