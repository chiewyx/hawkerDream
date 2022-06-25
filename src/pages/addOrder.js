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
  FormLabel,
  Spacer,
} from "@chakra-ui/react";

import { MinusIcon, AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { useState, useEffect, useReducer } from "react";
import { supabase } from "../supabase";

export default function AddOrder() {
  const [list, setList] = useState([]);
  const toast = useToast();
  const [submitting, setSubmitting] = useState(false);

  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [customerName, setCustomerName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [orderList, setOrderList] = useState([]);

  // to get the order list updated by supplier
  const fetchList = async () => {
    const { data: itemList } = await supabase
      .from("orderList")
      .select("*")
      .order("item", true);

    setList(itemList);
  };

  useEffect(() => {
    fetchList();
  }, []);

  const formReducer = (state, event) => {
    return {
      ...state,
      [event.target.name]: event.target.value,
    };
  };

  const [formData, setFormData] = useReducer(formReducer, {});

  const handleChange = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  const [userinfo, setUserInfo] = useState({
    languages: [],
    response: [],
  });
  
  const handleCheck = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const { languages } = userinfo;
      
    console.log(`${value} is ${checked}`);
     
    // Case 1 : The user checks the box
    if (checked) {
      setUserInfo({
        languages: [...languages, value],
        response: [...languages, value],
      });
    }
  
    // Case 2  : The user unchecks the box
    else {
      setUserInfo({
        languages: languages.filter((e) => e !== value),
        response: languages.filter((e) => e !== value),
      });
    }
  };

  async function insertForm(e) {
    e.preventDefault();
    try {
      setSubmitting(true);
      const user = supabase.auth.user();
      const updates = {
        user_id: user.id,
        user_email: user.email,
        delivery_address: deliveryAddress,
        customer_name: customerName,
        delivery_date: deliveryDate,
        contact_number: contactNumber,
        item_list: userinfo.languages, 
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
      setSubmitting(false);
    }
  }

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
                onChange={(e) => setContactNumber(e.target.value)}
                value={contactNumber || ""}
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
                value={deliveryDate}
              />
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
                      name="item"
                    />

                    {item.item}
                  </Box>

                  <input type="number" name="quantity" step="1" />


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
