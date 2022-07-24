import Simple from "../../components/profilebar";
import {
  Grid,
  Stack,
  Box,
  Flex,
  Button,
  useToast,
  useColorModeValue,
  Text,
  IconButton,
  HStack,
  Spacer,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../supabase";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

export default function AddOrder() {
  const [list, setList] = useState([]);
  const user = supabase.auth.user();
  const [loading, setLoading] = useState(true);

  const [checked, setChecked] = useState(new Array(256).fill(false));

  const [customerName, setCustomerName] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [quantity, setQuantity] = useState(new Array(256).fill(0));
  const [totalAmt, setTotalAmt] = useState(0);

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

  const [orderedItems, setOrderedItems] = useState([]);

  const handleChange = (item, event, index) => {
    if (event.target.checked) {
      setOrderedItems([...orderedItems, item.item]);
      checked[index] = true;
      // add item to orderedItems array
    } else {
      // remove item from orderedItems array
      setOrderedItems((cartItem) =>
        cartItem.filter((i) => i.item !== item.item)
      );
      checked[index] = false;
    }
  };

  const decreaseQuantity = (item, index) => {
    const newQuantity = [...quantity];
    newQuantity[index] = newQuantity[index] === 0 ? 0 : newQuantity[index] - 1;
    setQuantity(newQuantity);

    if (newQuantity[index] !== 0) {
      setTotalAmt(totalAmt - item.price);
    }
  };

  const increaseQuantity = (item, index) => {
    const newQuantity = [...quantity];
    newQuantity[index] = newQuantity[index] + 1;
    setQuantity(newQuantity);

    setTotalAmt(totalAmt + item.price);
  };

  async function insertForm(e) {
    e.preventDefault();

    try {
      setLoading(true);
      const user = supabase.auth.user();
      const updates = {
        user_id: user.id,
        user_email: user.email,
        item_list: orderedItems,
        delivery_date: deliveryDate,
        delivery_address: deliveryAddress,
        customer_name: customerName,
        contact_number: contactNum,
        quantity: quantity.filter((e) => e),
        total_cost: totalAmt,
        completed: false,
        created_at: new Date(),
      };

      let { error } = await supabase.from("orders").upsert(updates, {
        returning: "minimal", // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
      toast({
        title: "Order uploaded",
        description: "You've uploaded your order successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  }
  return (
    <div>
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
          to="/order/updateorder"
        >
          Update order list
        </Button>
      </HStack>
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
            <Grid templateColumns="repeat(1,1fr)" gap={6}>
              <FormControl isRequired>
                <FormLabel htmlFor="customerName">Customer name</FormLabel>

                <input
                  type="text"
                  name="customerName"
                  id="customerName"
                  minLength={1}
                  maxLength={10}
                  required
                  value={customerName || ""}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="contactNum">Contact Number</FormLabel>

                <input
                  type="int"
                  name="contactNum"
                  id="contactNum"
                  minLength={8}
                  maxLength={8}
                  required
                  value={contactNum || ""}
                  onChange={(e) => setContactNum(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="deliveryAddress">
                  Delivery Address
                </FormLabel>
                <input
                  type="text"
                  name="deliveryAddress"
                  id="deliveryAddress"
                  required
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  value={deliveryAddress || ""}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="deliveryDate">Delivery Date</FormLabel>
                <input
                  type="date"
                  name="deliveryDate"
                  id="deliveryDate"
                  required
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  value={deliveryDate || ""}
                />
              </FormControl>
            </Grid>

            <Grid templateColumns="repeat(3,1fr)" gap={6}>
              <Text fontWeight="semibold"> Item </Text>
              <Text fontWeight="semibold"> Price </Text>
              <Text fontWeight="semibold"> Quantity </Text>
            </Grid>

            {list.map((item, index) => (
              <div key={index}>
                <Grid templateColumns="repeat(3,1fr)" gap={6}>
                  <Box>
                    <input
                      value={item.item}
                      type="checkbox"
                      onChange={(event) => handleChange(item, event, index)}
                    />

                    {item.item}
                  </Box>
                  ${item.price}
                  {item.units}
                  <Box>
                    <IconButton
                      icon={<MinusIcon />}
                      w={7}
                      h={7}
                      onClick={() => decreaseQuantity(item, index)}
                    />

                    {quantity[index]}

                    <IconButton
                      icon={<AddIcon />}
                      w={7}
                      h={7}
                      onClick={() => increaseQuantity(item, index)}
                    />
                  </Box>
                </Grid>
              </div>
            ))}

            <Text> Total: ${totalAmt} </Text>

            <Button
              bg={"blue.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "blue.500",
              }}
              type="submit"
            >
              Upload order
            </Button>
          </Stack>
        </Flex>
      </form>
    </div>
  );
}
