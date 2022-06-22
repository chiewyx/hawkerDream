import {
  Button,
  Center,
  Flex,
  Grid,
  Heading,
  HStack,
  Spacer,
  TabIndicator,
} from "@chakra-ui/react";
import ProductSimple from "../components/invoiceCard";
import Simple from "../components/profilebar";
import { supabase } from "../supabase";
import { useState, useEffect } from "react";
import { Link, Link as ReactRouterLink } from "react-router-dom";

export default function Invoice() {
  const user = supabase.auth.user();
  const session = supabase.auth.session();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  //const [avatar_url, setAvatarUrl] = useState();
  //const [profile_type, setProfileType] = useState();
  //const [showPassword, setShowPassword] = useState(false);

  async function getResult() {
    //setLoading(true);
    const user = supabase.auth.user();
    const { data, error, status } = await supabase
      .from("invoices")
      .select(`month, cost, supplier, id`)
      .eq("user_id", user.id)
      .eq("month");

    const newData = Array.from(data);
    setResults(newData);
  }

  useEffect(() => {
    getResult();
  }, []);

  return (
    <div>
      <Simple />
      <Grid templateColumns="repeat(4, 1fr)" spacing={20} px={20}>
        {results.map((result) => (
          <ProductSimple
            name={result.month}
            price={result.cost}
            supplier={result.supplier}
          />
        ))}
        <Spacer />
        <Button
          bg={"blue.400"}
          rounded={"full"}
          color={"white"}
          _hover={{ bg: "blue.500" }}
          as={Link}
          to="/invoice/updateinvoice"
          py={400}
        >
          Update Invoice
        </Button>
      </Grid>
    </div>
  );
}
