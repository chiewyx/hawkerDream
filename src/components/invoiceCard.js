/*
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import folder from "../folder.svg";
import { useState, useEffect } from "react";
import { supabase } from "../supabase";

export default function ProductSimple(props) {
  const [results, setResults] = useState("");

  const getResult = async (path) => {
    //setLoading(true);
    const user = supabase.auth.user();
    const { data, error } = await supabase.storage
      .from("invoices")
      .download(`${user.id}/${props.name}/${props.supplier}`);

    const url = URL.createObjectURL(data);
    setResults(url);
  };

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
            backgroundImage: `url(${folder})`,
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
            src={folder}
          />
        </Box>
        <Stack pt={10} align={"center"}>
          <Button
            color={"gray.500"}
            fontSize={"sm"}
            textTransform={"uppercase"}
          >
            Month
          </Button>
          <Link to={results} download />
          <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
            {props.name}
          </Heading>
          <Stack direction={"row"} align={"center"}>
            <Text fontWeight={800} fontSize={"xl"}>
              {props.price}
            </Text>
            <Text fontWeight={800} fontSize={"xl"}>
              {props.supplier}
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
*/

import {
  Box,
  Center,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  Button,
  useColorModeValue,
  useToast,
  HStack,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { useState, useEffect, useCallback, useRef } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { supabase } from "../supabase";

export default function ProductSimple(props) {
  const [results, setResults] = useState("");
  const toast = useToast();

  const getResult = useCallback(async () => {
    //setLoading(true);
    const user = supabase.auth.user();
    const { data, error } = await supabase.storage
      .from("invoices")
      .download(`${user.id}/${props.name}/${props.supplier}`);
    if (data) {
      const url = URL.createObjectURL(data);
      setResults(url);
    } else if (error) {
      setResults(null);
    }
  }, [props.name, props.supplier]);

  useEffect(() => {
    getResult();
  }, [getResult]);

  const handleCompleted = async (orderId) => {
    const { data, error } = await supabase
      .from("invoices")
      .update({ deleted: true })
      .match({ id: orderId });

    toast({
      title: "Order Completed",
      description: "You've Completed your order",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  function AlertDialogExample() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();

    return (
      <>
        <Button
          mt={10}
          w={"full"}
          bg={"red.400"}
          color={"white"}
          rounded={"xl"}
          boxShadow={"0 5px 20px 0px rgb(72 187 120 / 43%)"}
          _hover={{
            bg: "red.500",
          }}
          _focus={{
            bg: "red.500",
          }}
          onClick={onOpen}
        >
          Delete
        </Button>

        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Invoice
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => handleCompleted(props.id)}
                  ml={3}
                >
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    );
  }

  return (
    <Center py={6}>
      <Box
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Stack
          textAlign={"center"}
          p={6}
          color={useColorModeValue("gray.800", "white")}
          align={"center"}
        >
          <Text
            fontSize={"lg"}
            fontWeight={500}
            bg={useColorModeValue("green.50", "green.900")}
            p={2}
            px={3}
            color={"green.500"}
            rounded={"full"}
          >
            {props.supplier}
          </Text>
          <Stack direction={"row"} align={"center"} justify={"center"}>
            <Text fontSize={"3xl"}>$</Text>
            <Text fontSize={"6xl"} fontWeight={800}>
              {props.price}
            </Text>
          </Stack>
        </Stack>

        <Box bg={useColorModeValue("gray.50", "gray.900")} px={6} py={10}>
        <Stack>
          <List spacing={3}>
            {props.items.split(",").map((order) => (
              <ListItem>
                <ListIcon as={CheckIcon} color="green.400" />
                {order}
              </ListItem>
            ))}
          </List>
          <HStack>
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
              as="a"
              href={results}
              download
            >
              Invoice
            </Button>
            <AlertDialogExample />
          </HStack>
          </Stack>
        </Box>
      </Box>
    </Center>
  );
}
