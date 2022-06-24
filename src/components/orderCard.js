import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import folder from "../folder.svg";
import calendar from "../calendar.svg";
import groceries from "../groceries.svg"
import { supabase } from "../supabase";
import { useState, useEffect, useCallback } from "react";

export default function ProductOrder(props) {
  const [orders, setOrders] = useState([]);

  

  const getOrder =  useCallback( async() => {
    //setLoading(true);
    //const user = supabase.auth.user();
    const { data, error, status } = await supabase
      .from("orderList")
      .select("item")
      .eq("user_id", `${props.userid}`)
      console.log("hello")
      
      const newData = Array.from(data);
      setOrders(newData);
  }, [props.userid])

  useEffect(() => {
    getOrder();
  }, [getOrder]);

  return (
    <Center py={12}>
      <Box
        role={"group"}
        p={6}
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Box
          rounded={"lg"}
          //mt={}
          pos={"relative"}
          height={"230px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage: `url(${groceries})`,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Image
            rounded={"lg"}
            height={230}
            width={282}
            objectFit={"cover"}
            src={groceries}
          />
        </Box>
        <Stack pt={10} align={"center"}>
          <Text
            color={"gray.500"}
            fontSize={"sm"}
            textTransform={"uppercase"}
            as={Link}
            to={"/order/addorder"}
          >
            ORDER
          </Text>
          <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
            {props.name}
          </Heading>
          <Stack direction={"row"} align={"center"}>
            {orders.map((order) => (
              <li>{order.item}</li>
            ))}
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
