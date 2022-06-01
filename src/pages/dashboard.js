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
  Flex,
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
      <Simple />
      <Flex
          minH={"100vh"}
          align={"top"}
          justify={"center"}
          bg={"gray.50"}
        >

        </Flex>
    </div>
  );
}
