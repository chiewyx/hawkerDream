/*
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRef } from "react";
import { Link } from "react-router-dom";

export default function LoginCard() {
  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    // @TODO: add login logic
  }

  return (
    <form onSubmit={handleSubmit}>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool <Link color={"blue.400"}>features</Link>{" "}
              ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input type="email" ref={emailRef} />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input type="password" ref={passwordRef} />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={"blue.400"}>
                    Forgot password?
                  </Link>
                </Stack>
                <Button
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign in
                </Button>
                <Stack pt={6}>
                <Text align={"center"}>
                  not a user? <Link to="signup" color={"blue.400"}>Signup</Link>
                </Text>
              </Stack>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </form>
  );
}
*/

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  VStack,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRef } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";
import WithSubnavigation from "../components/navbar";

export default function SimpleCard() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const { error } = await supabase.auth.signIn({ email, password });
    if (error) {
      alert("error signing in");
    } else {
      // Redirect user to Dashboard
      navigate("/dashboard");
    }
  }

  return (
    <div>
      <WithSubnavigation />
      <form onSubmit={handleSubmit}>
        <Flex
          minH={"100vh"}
          align={"top"}
          justify={"center"}
          bg={useColorModeValue("brand.90", "brand.80")}
        >
          <Stack direction={"row"} alignItems="flex-start" spacing={371.5}>
            <VStack alignItems={"center"} py={150} px={6} spacing={50}>
              <Heading fontSize="4xl" textAlign={"center"}>
                One-stop solution for hawkers <Spacer /> and suppliers to
                connect
              </Heading>
              <Text fontSize="lg" textAlign={"center"}>
                Join HawkerTown today to gain access to <Spacer /> our invoice,
                order managing system <Spacer /> and connect with fellow hawkers
                and suppliers.
              </Text>
            </VStack>
            <Stack spacing={10} mx={"auto"} maxW={"lg"} py={150} px={6}>
              <Stack align={"center"}>
                <Heading fontSize={"4xl"}>Sign in to your account</Heading>
                <Text fontSize={"lg"} color={"gray.600"}>
                  to enjoy all of our cool features ✌️
                </Text>
              </Stack>
              <Box
                rounded={"lg"}
                bg={useColorModeValue("white", "gray.700")}
                boxShadow={"lg"}
                p={8}
              >
                <Stack spacing={4}>
                  <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" ref={emailRef} />
                  </FormControl>
                  <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <Input type="password" ref={passwordRef} />
                  </FormControl>
                  <Stack spacing={10}>
                    <Stack
                      direction={{ base: "column", sm: "row" }}
                      align={"start"}
                      justify={"space-between"}
                    >
                      <Checkbox>Remember me</Checkbox>
                    </Stack>
                    <Button
                      type={"submit"}
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                    >
                      Sign in
                    </Button>
                  </Stack>
                  <Stack pt={6}>
                    <Text align={"center"}>
                      Not a user?{" "}
                      <Link
                        as={ReactRouterLink}
                        to="/signup"
                        color={"blue.400"}
                      >
                        Sign up
                      </Link>
                    </Text>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </Flex>
      </form>
    </div>
  );
}
