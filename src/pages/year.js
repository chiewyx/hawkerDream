import Simple from "../components/profilebar";
import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import {
  Button,
  Flex,
  Grid,
  Heading,
  HStack,
  TabIndicator,
} from "@chakra-ui/react";
import ProductYear from "../components/yearCard";

export default function DisplayYear() {
  const [results, setResults] = useState([]);
  const user = supabase.auth.user();
  async function getResult() {
    //setLoading(true);
    const user = supabase.auth.user();
    const { data, error, status } = await supabase
      .from("invoices")
      .select(`year`)
      .eq("user_id", user.id)

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
        <ProductYear name="2018" />
        <ProductYear name="2019" />
        <ProductYear name="2020" />
        <ProductYear name="2021" />
        <ProductYear name="2022" />
      </Grid>
    </div>
  );
}
