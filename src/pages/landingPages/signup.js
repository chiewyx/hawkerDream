import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Link,
  Stack,
  VStack,
  Button,
  Heading,
  Spacer,
  Text,
  Select,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { supabase } from "../../supabase";
import { useNavigate } from "react-router-dom";
import WithSubnavigation from "../../components/navbar";
import { Link as ReactRouterLink } from "react-router-dom";

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [profile_type, setProfileType] = useState();
  const navigate = useNavigate();
  const toast = useToast();

  async function handleSubmit(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const { error } = await supabase.auth.signUp(
      { email, password },
      {
        data: {
          first_name,
          last_name,
          profile_type,
        },
      }
    );
    if (error) {
      alert("error signing in");
    } else {
      // Redirect user to Dashboard
      toast({
        title: "Sign up successful",
        description: "Please verify your email!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setTimeout(() => navigate("/login"), 1000);
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
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          <Stack direction={"row"} alignItems="flex-start" spacing={300}>
            <VStack alignItems={"center"} py={150} px={6} spacing={50}>
              <Spacer />

              <Heading fontSize="4xl" color="black" textAlign={"center"}>
                One-stop solution for hawkers <Spacer /> and suppliers to
                connect
              </Heading>
              <Text fontSize="lg" textAlign={"center"}>
                Join HawkerTown today to gain access to <Spacer /> our invoice,
                order managing system <Spacer /> and connect with fellow hawkers
                and suppliers.
              </Text>
            </VStack>
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={150} px={6}>
              <Stack align={"center"}>
                <Heading fontSize={"4xl"} textAlign={"center"}>
                  Sign up
                </Heading>
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
                  <Select
                    placeholder="Select profile"
                    onChange={(e) => setProfileType(e.target.value)}
                  >
                    <option value="hawker">Hawker</option>
                    <option value="supplier">Supplier</option>
                  </Select>
                  <HStack>
                    <Box>
                      <FormControl id="firstName" isRequired>
                        <FormLabel>First Name</FormLabel>
                        <Input
                          type="text"
                          value={first_name}
                          onChange={(e) => setFirstName(e.target.value)}
                          data-testid="first name"
                        />
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl id="lastName">
                        <FormLabel>Last Name</FormLabel>
                        <Input
                          type="text"
                          value={last_name}
                          onChange={(e) => setLastName(e.target.value)}
                          data-testid="last name"
                        />
                      </FormControl>
                    </Box>
                  </HStack>
                  <FormControl id="email" isRequired>
                    <FormLabel htmlFor="email">Email address</FormLabel>
                    <Input
                      type="email"
                      ref={emailRef}
                      data-testid="email-input"
                    />
                  </FormControl>
                  <FormControl id="password" isRequired>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <InputGroup>
                      <Input
                        type={showPassword ? "text" : "password"}
                        ref={passwordRef}
                        data-testid="password"
                      />
                      <InputRightElement h={"full"}>
                        <Button
                          variant={"ghost"}
                          onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                          }
                        >
                          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <Stack spacing={10} pt={2}>
                    <Button
                      type="submit"
                      loadingText="Submitting"
                      size="lg"
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                      data-testid="submit button"
                    
                    >
                      Sign up
                    </Button>
                  </Stack>
                  <Stack pt={6}>
                    <Text align={"center"}>
                      Already a user?{" "}
                      <Link as={ReactRouterLink} to="/login" color={"blue.400"}>
                        Login
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
