import Simple from "../components/profilebar";
import { useAuth } from "../contexts/auth";
import { supabase } from "../supabase";
import {
  Stack,
  Button,
  Text,
  Flex,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
//import mainlogo from "../logo.jpg";
import UserProfileEdit from "./update";

export default function Dashboard() {
  //const { user } = useAuth()
  const user = supabase.auth.user();
  const session = supabase.auth.session();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState();
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  //const [avatar_url, setAvatarUrl] = useState();
  const [profile_type, setProfileType] = useState();
  //const [showPassword, setShowPassword] = useState(false);

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
      <Flex minH={"100vh"} align={"top"} justify={"center"} bg={"gray.50"}>
        <Flex
          w={"full"}
          h={"40vh"}
          backgroundImage={
            "url(https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80)"
          }
          backgroundSize={"cover"}
          backgroundPosition={"center center"}
        >
          <VStack
            w={"full"}
            justify={"center"}
            px={useBreakpointValue({ base: 4, md: 8 })}
            bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
          >
            <Stack maxW={"2xl"} align={"flex-start"} spacing={6}>
              <Text
                color={"white"}
                fontWeight={700}
                lineHeight={1.2}
                fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}
              >
                Welcome back {first_name}
              </Text>
              <Stack direction={"row"}>
                <Button
                  bg={"blue.400"}
                  rounded={"full"}
                  color={"white"}
                  _hover={{ bg: "blue.500" }}
                  as={Link}
                  to="/dashboard/update"
                >
                  Set-up/Update your profile!
                </Button>
              </Stack>
            </Stack>
          </VStack>
        </Flex>
        
      </Flex>
    </div>
  );
}
