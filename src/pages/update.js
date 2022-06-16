import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  Select,
  AvatarBadge,
  IconButton,
  Center,
  useToast
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useAuth } from "../contexts/auth";
import { supabase } from "../supabase";
import { useState, useEffect } from "react";
import Simple from "../components/profilebar";

export default function UserProfileEdit() {
  const user = supabase.auth.user();
  const session = supabase.auth.session();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState();
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [avatar_url, setAvatarUrl] = useState();
  const [profile_type, setProfileType] = useState();
  //const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  async function getProfile() {
    //e.preventDefault();
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const { data, error, status } = await supabase
        .from("user_profiles")
        .select(`username, first_name, last_name, profile_type`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setAvatarUrl(data.avatar_url);
        setProfileType(data.profile_type);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  async function updateProfile(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: user.id,
        username,
        first_name,
        last_name,
        profile_type,
        updated_at: new Date(),
      };

      let { error } = await supabase.from("user_profiles").upsert(updates, {
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
      <Simple />
      <form onSubmit={updateProfile}>
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
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
              User Profile Edit
            </Heading>
            <FormControl id="userName">
              <FormLabel>User Icon</FormLabel>
              <Stack direction={["column", "row"]} spacing={6}>
                <Center>
                  <Avatar size="xl" src="https://bit.ly/sage-adebayo">
                    <AvatarBadge
                      as={IconButton}
                      size="sm"
                      rounded="full"
                      top="-10px"
                      colorScheme="red"
                      aria-label="remove Image"
                      icon={<SmallCloseIcon />}
                    />
                  </Avatar>
                </Center>
                <Center w="full">
                  <Button w="full">Change Icon</Button>
                </Center>
              </Stack>
            </FormControl>
            <Select
              placeholder="Select profile"
              onChange={(e) => setProfileType(e.target.value)}
            >
              <option value="hawker">Hawker</option>
              <option value="supplier">Supplier</option>
            </Select>
            <FormControl id="userName" isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                placeholder="UserName"
                _placeholder={{ color: "gray.500" }}
                type="text"
                value={username || ""}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <HStack>
              <FormControl id="firstName" isRequired>
                <FormLabel>First Name</FormLabel>
                <Input
                  placeholder="FirstName"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  value={first_name || ""}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </FormControl>
              <FormControl id="LastName" isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input
                  placeholder="LastName"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  value={last_name || ""}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </FormControl>
            </HStack>
            <Stack spacing={6} direction={["column", "row"]}>
              <Button
                bg={"red.400"}
                color={"white"}
                w="full"
                _hover={{
                  bg: "red.500",
                }}
              >
                Cancel
              </Button>
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
                    title: "Profile updated",
                    description: "You've updated your profile successfully",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  })
                }
              >
                Update
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </form>
    </div>
  );
}
