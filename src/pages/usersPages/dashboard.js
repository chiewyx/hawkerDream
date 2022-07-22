import Simple from "../../components/profilebar";
import { supabase } from "../../supabase";
import {
  Box,
  Text,
  Stack,
  Button,
  Flex,
  VStack,
  useBreakpointValue,
  Heading,
  Grid,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircleIcon, CloseIcon, CalendarIcon } from "@chakra-ui/icons";

export default function Dashboard() {
  const user = supabase.auth.user();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState();
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [profile_type, setProfileType] = useState();
  const [orderList, setOrderList] = useState([]);
  const [incompleteNum, setIncompleteNum] = useState();
  const [completeNum, setCompleteNum] = useState();
  const today = new Date();
  const month = today.toLocaleString("default", { month: "long" });
  const [totalCost, setTotalCost] = useState("");

  async function getProfile() {
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

  async function getTotalCost() {
    const user = supabase.auth.user();
    // get the orders keyed in manually by the suppliers
    const { data: totalCost } = await supabase
      .from("invoices")
      .select("cost")
      .eq("month", month)
      .eq("user_id", user.id);

    setTotalCost(totalCost.reduce((partialSum, a) => partialSum + a.cost, 0));
  }

  async function fetchIncomplete() {
    // get the orders keyed in manually by the suppliers
    const { data: pp } = await supabase
      .from("user_profiles")
      .select("profile_type")
      .eq("id", user.id)
      .single();

    if (pp.profile_type === "supplier") {
      const { data, count } = await supabase
        .from("orders")
        .select("*", { count: "exact" })
        .eq("user_id", user.id)
        .eq("completed", false)
        .order("id", true);
      setOrderList(data);
      setIncompleteNum(count);
    } else {
      const { data, count } = await supabase
        .from("orders")
        .select("*", { count: "exact" })
        .eq("user_email", user.email)
        .eq("completed", false)
        .order("id", true);
      setOrderList(data);
      setIncompleteNum(count);
    }
  }

  async function fetchComplete() {
    // get the orders keyed in manually by the suppliers
    const { data: pp } = await supabase
      .from("user_profiles")
      .select("profile_type")
      .eq("id", user.id)
      .single();

    if (pp.profile_type === "supplier") {
      const { data, count } = await supabase
        .from("orders")
        .select("*", { count: "exact" })
        .eq("user_id", user.id)
        .eq("completed", true)
        .order("id", true);
      setOrderList(data);
      setCompleteNum(count);
    } else {
      const { data, count } = await supabase
        .from("orders")
        .select("*", { count: "exact" })
        .eq("user_email", user.email)
        .eq("completed", true)
        .order("id", true);

      setOrderList(data);
      setCompleteNum(count);
    }
  }

  useEffect(() => {
    getProfile();
    fetchIncomplete();
    fetchComplete();
    getTotalCost();
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
      <Flex align={"top"} justify={"center"} bg={"gray.50"} minH={"100vh"}>
        <VStack w={"full"}>
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
                  Welcome back, {first_name}
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
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            <Box
              maxW="lg"
              borderWidth="5px"
              borderRadius="lg"
              overflow="hidden"
              m={50}
              p={10}
              textAlign="center"
            >
              <CloseIcon boxSize={"50px"} color={"red.500"} />
              <Heading as="h2" size="xl" mt={6} mb={2}>
                {incompleteNum} incomplete orders
              </Heading>
              <Text size="lg" color={"gray.500"} as={Link} to="/order">
                {" "}
                View incomplete orders
              </Text>
            </Box>
            <Box
              maxW="lg"
              borderWidth="5px"
              borderRadius="lg"
              overflow="hidden"
              m={50}
              p={10}
              textAlign="center"
            >
              <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
              <Heading as="h2" size="xl" mt={6} mb={2}>
                {completeNum} completed orders
              </Heading>

              <Text
                size="lg"
                color={"gray.500"}
                as={Link}
                to={"/order/completedorders"}
              >
                {" "}
                View your completed orders
              </Text>
            </Box>
            <Box
              maxW="lg"
              borderWidth="5px"
              borderRadius="lg"
              overflow="hidden"
              m={50}
              p={10}
              textAlign="center"
            >
              <CalendarIcon boxSize={"50px"} color={"blue.500"} mt={2} mb={5} />

              <p>
                {" "}
                Your total invoice amount:
                <Heading as="h2" size="xl">
                  ${totalCost}
                </Heading>{" "}
              </p>

              <Text
                size="lg"
                color={"gray.500"}
                as={Link}
                to={"/invoice/" + month}
              >
                {" "}
                View your invoices for {month}
              </Text>
            </Box>
          </Grid>
        </VStack>
      </Flex>
    </div>
  );
}
