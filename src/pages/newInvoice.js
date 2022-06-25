import Simple from "../components/profilebar";
import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  Select,
  AvatarBadge,
  IconButton,
  Center,
  useToast,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import UploadImage from "../components/uploadImg";

export default function UpdateInvoice() {
  const [loading, setLoading] = useState(true);
  const [cost, setCost] = useState();
  const [supplier, setSupplier] = useState();
  const [month, setMonth] = useState();
  const toast = useToast();

  async function insertInvoice(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const user = supabase.auth.user();
      const updates = {
        user_id: user.id,
        user_email: user.email,
        month,
        cost,
        supplier,
        created_at: new Date(),
      };

      let { error } = await supabase.from("invoices").upsert(updates, {
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
      <form onSubmit={insertInvoice}>
        <Flex
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          <Stack
            spacing={4}
            w={"full"}
            maxW={"md"}
            bg={useColorModeValue("white", "gray.700")}
            rounded={"xl"}
            boxShadow={"lg"}
            p={6}
            my={12}
          >
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
              Insert Invoice
            </Heading>
            
            <FormControl id="month" isRequired>
              <FormLabel>Month</FormLabel>
              <Input
                placeholder="Month"
                _placeholder={{ color: "gray.500" }}
                type="text"
                value={month || ""}
                onChange={(e) => setMonth(e.target.value)}
              />
            </FormControl>
            <HStack>
              <FormControl id="supplier" isRequired>
                <FormLabel>Supplier</FormLabel>
                <Input
                  placeholder="Supplier"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  value={supplier || ""}
                  onChange={(e) => setSupplier(e.target.value)}
                />
              </FormControl>
              <FormControl id="Cost" isRequired>
                <FormLabel>Cost</FormLabel>
                <Input
                  placeholder="Cost"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  value={cost || ""}
                  onChange={(e) => setCost(e.target.value)}
                />
              </FormControl>
            </HStack>
            
            <UploadImage month={month} supplier={supplier}/>
            <Stack spacing={6} direction={["column", "row"]}>
              <Button
                bg={"red.400"}
                color={"white"}
                w="full"
                _hover={{
                  bg: "red.500",
                }}
              >
                Cancel
              </Button>
              <Button
                bg={"blue.400"}
                color={"white"}
                w="full"
                _hover={{
                  bg: "blue.500",
                }}
                type="submit"
                onClick={() =>
                  toast({
                    title: "Invoice uploaded",
                    description: "You've uploaded your invoice successfully",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  })
                }
              >
                Update
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </form>
    </div>
  );
}
