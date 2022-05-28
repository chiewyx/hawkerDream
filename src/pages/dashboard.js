import Simple from "../components/profilebar";
import { useAuth } from "../contexts/auth";
import { supabase } from "../supabase";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Select,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
//import UserProfileEdit from "../components/update";

export default function Dashboard() {
  //const { user } = useAuth()
  const user = supabase.auth.user();
  const session = supabase.auth.session();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState();
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [avatar_url, setAvatarUrl] = useState();
  const [profile_type, setProfileType] = useState();
  const [showPassword, setShowPassword] = useState(false);

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
      <Heading> welcome {first_name}</Heading>
      <Heading> welcome {profile_type}</Heading>
      <form onSubmit={updateProfile}>
        <Heading>Email: {session.user.email} </Heading>
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
                <FormControl id="username" isRequired>
                  <FormLabel>username</FormLabel>
                  <Input
                    type="text"
                    value={username || ""}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    value={first_name || ""}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    value={last_name || ""}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </FormControl>
              </Box>
            </HStack>

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
              >
                update profile
              </Button>
            </Stack>
          </Stack>
        </Box>
      </form>
      <Simple />
    </div>
  );
}
