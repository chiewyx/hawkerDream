import Simple from "../components/profilebar";
import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { Button, Flex, Grid, Heading, HStack, TabIndicator } from "@chakra-ui/react";
import ProductMonth from "../components/monthCard";


export default function DisplayMonth(props) {
  const [results, setResults] = useState([]);
  const user = supabase.auth.user();
  async function getInvoices() {
    const { data, error } = await supabase.storage
      .from("invoices")
      .list('a56c92b3-d8da-4deb-a685-f801059f1c26/June', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
      });
      const newData = Array.from(data)
      setResults(newData);
  }
  useEffect(() => {
    getInvoices();
  }, []);

  return (
    <div>
      <Simple />
      <Grid templateColumns="repeat(4, 1fr)" spacing={20} px={20}>
        <ProductMonth name="January" />
        <ProductMonth name="February" />
        <ProductMonth name="March" />
        <ProductMonth name="April" />
        <ProductMonth name="May" />
        <ProductMonth name="June" />
        <ProductMonth name="July" />
        <ProductMonth name="August" />
        <ProductMonth name="September" />
        <ProductMonth name="October" />
        <ProductMonth name="November" />
        <ProductMonth name="December" />
      </Grid>
        
        
    </div>
  );
}
