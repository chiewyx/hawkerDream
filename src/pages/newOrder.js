import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import Simple from "../components/profilebar";
import {
  Grid,
  IconButton,
  Input,
  Stack,
  Flex,
  Button,
  useToast,
  useColorModeValue,
  Spacer,
  FormControl,
  HStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { DeleteIcon } from "@chakra-ui/icons";

export default function UpdateOrder() {
  const [list, setList] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [price, setPrice] = useState("");
  const user = supabase.auth.user();
  const toast = useToast();

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    const { data: itemList } = await supabase
      .from("orderList")
      .select("*")
      .eq("user_id", user.id)
      .order("item", true);

    setList(itemList);
  };

  const addItem = async (itemName) => {
    if (itemName === "" && price === "") {
      alert("Item Name and price cannot be empty!");
    } else if (itemName === "") {
      alert("Item Name cannot be empty");
    } else if (price === "") {
      alert("Price cannot be empty");
    } else {
      let { data: item } = await supabase
        .from("orderList")
        .insert({ item: itemName, user_id: user.id, price: price })
        .single();
      setList([...list, item]);
      setNewItem("");
      setPrice("");

      toast({
        title: "Item added",
        description: "You've added your item successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const deleteItem = async (itemId) => {
    try {
      await supabase
        .from("orderList")
        .delete()
        .eq("id", itemId, "user_id", user.id);

      setList(list.filter((item) => item.id !== itemId));
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <Simple />
      <HStack bg={useColorModeValue("gray.50", "gray.800")}>
        <Spacer />

        <Button
          bg={"blue.400"}
          rounded={"full"}
          color={"white"}
          _hover={{ bg: "blue.500" }}
          as={Link}
          to="/order"
        >
          View your orders
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
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"2xl"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            <Input
              type="text"
              required
              placeholder="Add item here"
              value={newItem}
              onChange={(event) => {
                setNewItem(event.target.value);
              }}
            />

            <Input
              type="number"
              min="1"
              step="any"
              placeholder="Insert price here"
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
            <Button onClick={() => addItem(newItem)}> Add </Button>
          </Grid>

          {list.map((item) => (
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
              <li key={item.id}>{item.item}</li>${item.price}
              <IconButton
                icon={<DeleteIcon />}
                onClick={() => deleteItem(item.id)}
              />
            </Grid>
          ))}
        </Stack>
      </Flex>
    </>
  );
}
