import {
  Badge,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import groceries from "../groceries.svg";
import { supabase } from "../supabase";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import MktOrder from "./mktOrder";

export default function ProductTemplate(props) {
  const [orders, setOrders] = useState([]);

  const getOrder = useCallback(async () => {
    //setLoading(true);
    //const user = supabase.auth.user();
    const { data, error, status } = await supabase
      .from("orderList")
      .select("item")
      .eq("user_id", `${props.userid}`);

    //const newData = Array.from(data);
    setOrders(data);
  }, [props.userid]);

  useEffect(() => {
    getOrder();
  }, [getOrder]);

  return (
    <Center py={6}>
      <Stack
        borderWidth="1px"
        borderRadius="lg"
        w={{ sm: "100%", md: "540px" }}
        height={{ sm: "476px", md: "20rem" }}
        direction={{ base: "column", md: "row" }}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        padding={4}
      >
        <Flex flex={1} bg="blue.200">
          <Image objectFit="cover" boxSize="100%" src={groceries} />
        </Flex>
        <Stack
          flex={1}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p={1}
          pt={2}
        >
          <Heading fontSize={"2xl"} fontFamily={"body"}>
            {props.business}
          </Heading>
          <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
            {props.name}
          </Text>
          <Text
            textAlign={"center"}
            color={useColorModeValue("gray.700", "gray.400")}
            px={3}
          >
            {props.description}
          </Text>
          <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
            {props.item.split(",").map((order) => (
              <Badge px={2} py={1} bg={"gray.50"} fontWeight={"400"}>
                {order}
              </Badge>
            ))}
          </Stack>
          <Stack
            width={"100%"}
            mt={"2rem"}
            direction={"row"}
            padding={2}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Popover>
              <PopoverTrigger>
                <Button
                  flex={1}
                  fontSize={"sm"}
                  rounded={"full"}
                  _focus={{
                    bg: "blue.300",
                  }}
                >
                  Order
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Order form</PopoverHeader>
                <PopoverBody>
                  <MktOrder userid={props.userid} useremail={props.useremail} />
                </PopoverBody>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger>
                <Button
                  flex={1}
                  fontSize={"sm"}
                  rounded={"full"}
                  _focus={{
                    bg: "blue.300",
                  }}
                >
                  More details
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Items Sold</PopoverHeader>
                <PopoverBody>
                  {orders.map((order) => (
                    <li>{order.item}</li>
                  ))}
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Stack>
        </Stack>
      </Stack>
    </Center>
  );
}
