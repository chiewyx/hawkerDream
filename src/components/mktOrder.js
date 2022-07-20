import Simple from "../components/profilebar";
import {
  Grid,
  Stack,
  Box,
  Flex,
  Button,
  useToast,
  useColorModeValue, IconButton, Text, FormControl, FormLabel,
} from "@chakra-ui/react";

import { AddIcon, MinusIcon } from "@chakra-ui/icons"; 

import { useState, useEffect } from "react";
import { supabase } from "../supabase";

export default function MktOrder(props) {
  const [list, setList] = useState([]);
  const user = supabase.auth.user();
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState([]);
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
      .eq("user_id", props.userid)
      .order("item", true);

    setList(itemList);
  };

  const [orderInfo, setOrderInfo] = useState({
    items: [],
    response: [],
  });

  const [orderedItems, setOrderedItems] = useState([]);

  const handleChange = (item, event, index) => {
    if (event.target.checked) {
      setOrderedItems([...orderedItems, item.item]);
      checked[index] = true;

      // setTotalAmt(totalAmt + item.price);
      // add item to orderedItems array
    } else {
      // remove item from orderedItems array
      setOrderedItems((cartItem) =>
        cartItem.filter((i) => i.item !== item.item)
      );
      checked[index] = false;
      // setTotalAmt((total) => total - item.price);
    }
  };
  
  /* 

  const handleQuantity = (event, index) => {
    const newQuantity = [...quantity];

    newQuantity[index] = event.target.value;

    setQuantity(newQuantity);
  };

  */ 

  const decreaseQuantity = (item, index) => {
    const newQuantity = [...quantity];
    newQuantity[index] = newQuantity[index] === 0 ? 0 : newQuantity[index] - 1;
    setQuantity(newQuantity);

    setTotalAmt(totalAmt - item.price);
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
      
      const updates = {
        user_id: props.userid,
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
    }
  }
  return (
    <div>
      <form onSubmit={insertForm}>
     
          <Stack
            spacing={4}
            W={"3xl"}
            bg={useColorModeValue("white", "gray.700")}
            rounded={"xl"}
            boxShadow={"lg"}
            p={6}
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
                <Grid templateColumns="repeat(3,1fr)" gap={5}>
                  <Box>
                    <input
                      value={item.item}
                      type="checkbox"
                      onChange={(event) => handleChange(item, event, index)}
                      id={index}
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
              onClick={() =>
                toast({
                  title: "Order uploaded",
                  description: "You've uploaded your order successfully",
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                })
              }
            >
              Upload order
            </Button>
          </Stack> 
      </form>
    </div>
  );
}
