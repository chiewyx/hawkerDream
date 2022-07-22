import { Button, Grid } from "@chakra-ui/react";
import ProductSimple from "../components/invoiceCard";
import Simple from "../components/profilebar";
import { supabase } from "../supabase";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Invoice() {
  const [results, setResults] = useState([]);

  async function getResult() {
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
      <Grid templateColumns="repeat(3, 1fr)" spacing={20} px={20}>
        {results.map((result) => (
          <ProductSimple
            name={result.month}
            price={result.cost}
            supplier={result.supplier}
          />
        ))}

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
