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
  useToast,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { supabase } from "../../supabase";
import { useState, useEffect } from "react";
import Simple from "../../components/profilebar";

export default function UserProfileEdit() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState();
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [products_sold, setProductSold] = useState();
  const [avatar_url, setAvatarUrl] = useState();
  const [profile_type, setProfileType] = useState();
  const [description, setDescription] = useState();
  const toast = useToast();

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const { data, error, status } = await supabase
        .from("user_profiles")
        .select(
          `username, first_name, last_name, profile_type, products_sold, description`
        )
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
        setProductSold(data.products_sold);
        setDescription(data.description);
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
        products_sold,
        description,
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
      toast({
        title: "Profile updated",
        description: "You've updated your profile successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
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
              value={profile_type || "Select profile"}
              onChange={(e) => setProfileType(e.target.value)}
            >
              <option value="hawker">Hawker</option>
              <option value="supplier">Supplier</option>
            </Select>
            <FormControl id="userName" isRequired>
              <FormLabel>Hawker/Supplier name</FormLabel>
              <Input
                placeholder="Name of shop"
                _placeholder={{ color: "gray.500" }}
                type="text"
                value={username || ""}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl id="itemsSold" isRequired>
              <FormLabel>For Suppliers: What products do you sell?</FormLabel>
              <Input
                placeholder="poultry, vegetables, etc."
                _placeholder={{ color: "gray.500" }}
                type="text"
                value={products_sold || ""}
                onChange={(e) => setProductSold(e.target.value)}
              />
            </FormControl>
            <FormControl id="description" isRequired>
              <FormLabel>A short description of your store/business</FormLabel>
              <Input
                placeholder="Cheapest and highest quality beef, etc."
                _placeholder={{ color: "gray.500" }}
                type="text"
                value={description || ""}
                onChange={(e) => setDescription(e.target.value)}
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
