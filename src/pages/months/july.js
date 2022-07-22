import { Button, Grid } from "@chakra-ui/react";
import ProductSimple from "../../components/invoiceCard";
import Simple from "../../components/profilebar";
import { supabase } from "../../supabase";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function JulInvoice() {
  const [results, setResults] = useState([]);

  async function getResult() {
    const user = supabase.auth.user();
    const { data, error, status } = await supabase
      .from("invoices")
      .select(`month, cost, supplier, id, items`)
      .eq("user_id", user.id)
      .eq("month", "July")
      .eq("deleted", false);

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
            items={result.items}
            price={result.cost}
            supplier={result.supplier}
            id={result.id}
          />
        ))}
        <Button
          bg={"blue.400"}
          rounded={"full"}
          color={"white"}
          _hover={{ bg: "blue.500" }}
          as={Link}
          to="/invoice/updateinvoice"
          my={300}
          mx={50}
        >
          Update Invoice
        </Button>
      </Grid>
    </div>
  );
}
