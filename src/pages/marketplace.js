import Simple from "../components/profilebar";
import { supabase } from "../supabase";
import { useState, useEffect } from "react";
import { Grid } from "@chakra-ui/react";
import ProductTemplate from "../components/productCard";

export default function Marketplace() {
  const [supplier, setSupplier] = useState([]);

  async function getSupplier() {
    const { data, error, status } = await supabase
      .from("user_profiles")
      .select(`username, products_sold, first_name, description, id, email`)
      .eq("profile_type", "supplier");

    const newData = Array.from(data);
    setSupplier(newData);
  }

  useEffect(() => {
    getSupplier();
  }, []);

  return (
    <div>
      <Simple />
      <Grid templateColumns="repeat(2, 1fr)" spacing={60} px={20}>
        {supplier.map((order) => (
          <ProductTemplate
            userid={order.id}
            name={order.first_name}
            description={order.description}
            business={order.username}
            item={order.products_sold}
            useremail={order.email}
          />
        ))}
      </Grid>
    </div>
  );
}
