import Simple from "../components/profilebar";
import {
  Grid,
  Stack,
  Box,
  Flex,
  Button,
  useToast,
  useColorModeValue, IconButton, Text,
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

  const handleCheck = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const { items } = orderInfo;

    console.log(`${value} is ${checked}`);

    // Case 1 : The user checks the box
    if (checked) {
      setOrderInfo({
        items: [...items, value],
        response: [...items, value],
      });
    }

    // Case 2  : The user unchecks the box
    else {
      setOrderInfo({
        items: items.filter((e) => e !== value),
        response: items.filter((e) => e !== value),
      });
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
      const user = supabase.auth.user();
      const updates = {
        user_id: props.userid,
        user_email: props.useremail,
        item_list: orderInfo.response,
        delivery_date: deliveryDate,
        delivery_address: deliveryAddress,
        customer_name: customerName,
        contact_number: contactNum,
        quantity: quantity.filter((e) => e),
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
            w={"full"}
            maxW={"xl"}
            bg={useColorModeValue("white", "gray.700")}
            rounded={"xl"}
            boxShadow={"lg"}
            p={6}
          >
            <Grid templateColumns="repeat(2,1fr)" gap={6}>
              <label for="customerName"> Customer Name </label>
              <input
                type="text"
                name="customerName"
                id="customerName"
                onChange={(e) => setCustomerName(e.target.value)}
                value={customerName || ""}
              />

              <label for="contactNum"> Contact Number </label>
              <input
                type="int"
                name="contactNum"
                id="contactNum"
                onChange={(e) => setContactNum(e.target.value)}
                value={contactNum || ""}
              />

              <label for="deliveryAddress"> Delivery Address</label>
              <input
                type="text"
                name="deliveryAddress"
                id="deliveryAddress"
                onChange={(e) => setDeliveryAddress(e.target.value)}
                value={deliveryAddress || ""}
              />

              <label for="deliveryDate"> Delivery Date</label>
              <input
                type="date"
                name="deliveryDate"
                id="deliveryDate"
                onChange={(e) => setDeliveryDate(e.target.value)}
                value={deliveryDate || ""}
              />
            </Grid>

            <Grid templateColumns="repeat(2,1fr)" gap={6}>
              <text> Item </text>
              <text> Quantity </text>
            </Grid>

            {list.map((item, index) => (
              <div key={index}>
                <Grid templateColumns="repeat(3,1fr)" gap={5}>
                  <Box>
                    <input
                      value={item.item}
                      type="checkbox"
                      onChange={handleCheck}
                      id={index}
                    />
                    {item.item}
                  </Box>

                  ${item.price}

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
