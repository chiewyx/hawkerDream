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
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

export default function UpdateOrder() {
  const [list, setList] = useState([]);
  const [newItem, setNewItem] = useState("");
  const user = supabase.auth.user();
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

  const addItem = async (itemName) => {
    let { data: item } = await supabase
      .from("orderList")
      .insert({ item: itemName, user_id: user.id })
      .single();
    setList([...list, item]);

    toast({
      title: "Item added",
      description: "You've added your item successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
    })
  };

  const deleteItem = async (itemId) => {
    try {
      await supabase
        .from("orderList")
        .delete()
        .eq("id", itemId, "user_id", user.id);

      setList(list.filter((item) => item.id != itemId));
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <Simple />
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            <Input
              type="text"
              placeholder="Add item here"
              value={newItem}
              onChange={(event) => {
                setNewItem(event.target.value);
              }}
            />
            <Button onClick={() => addItem(newItem)}> Add </Button>
          </Grid>

          {list.map((item) => (
            <li key={item.id}>
              {item.item}

              <IconButton
                icon={<DeleteIcon />}
                onClick={() => deleteItem(item.id)}
              />
            </li>
          ))}
        </Stack>
      </Flex>
    </>
  );
}
