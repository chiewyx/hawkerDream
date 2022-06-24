import Simple from "../components/profilebar";
import { supabase } from "../supabase";
import { useState, useEffect } from "react";
import ProductOrder from "../components/orderCard";
import { Grid } from "@chakra-ui/react";

export default function Marketplace() {
  //const [orders, setOrders] = useState([]);
  const [supplier, setSupplier] = useState([]);

  async function getSupplier() {
    //setLoading(true);
    const user = supabase.auth.user();
    const { data, error, status } = await supabase
      .from("user_profiles")
      .select(`username`)
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
      <Grid templateColumns="repeat(4, 1fr)" spacing={20} px={20}>
        {supplier.map((order) => (
          <ProductOrder name={order.username} userid={order.id} />
        ))}
      </Grid>
    </div>
  );
}
