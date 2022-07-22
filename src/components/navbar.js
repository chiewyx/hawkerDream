import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  Square,
} from "@chakra-ui/react";
import { HashLink } from "react-router-hash-link";

import { HamburgerIcon, CloseIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Link as ReactRouterLink } from "react-router-dom";

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>

        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Button variant={"link"} as={ReactRouterLink} to="/">
            <Text
              fontSize="4xl"
              textAlign={"center"}
              fontFamily="Gill Sans"
              color="gray.600"
              fontWeight={"light"}
            >
              {" "}
              HawkerTown{" "}
            </Text>
          </Button>
          <Square size="40px" bg="white" color="white"></Square>

          <Flex display={{ base: "none", md: "flex" }} ml={10} py={{ base: 4 }}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Button
            as={ReactRouterLink}
            fontSize={"lg"}
            fontWeight={400}
            variant={"link"}
            to="/login"
          >
            Sign In
          </Button>
          <Button
            as={ReactRouterLink}
            style={{ height: "30px", width: "100px" }}
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"lg"}
            fontWeight={600}
            color={"white"}
            bg={"pink.400"}
            variant="link"
            to="/signup"
            _hover={{
              bg: "pink.300",
            }}
          >
            Sign Up
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <HashLink
                p={2}
                paddingTop={8}
                href={navItem.href ?? "#"}
                fontSize={"lg"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
                to={navItem.temp}
              >
                {navItem.label}
              </HashLink>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel, to }) => {
  return (
    <HashLink
      as={ReactRouterLink}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
      to={to}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>

          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </HashLink>
  );
};

const NAV_ITEMS = [
  {
    label: "Features",
    temp: "/",
    children: [
      {
        label: "Hawker",
        subLabel: "Manage your invoices with ease",
        href: "hawker",
        to: "/#section-two",
      },
      {
        label: "Supplier",
        subLabel: "List your products to hawkers in need",
        href: "supplier",
        to: "/#section-three",
      },
    ],
  },
  {
    label: "Marketplace",
    temp: "/#section-four",
    subLabel: "Find everything you need here",
    href: "marketplace",
    to: "/#section-four",
  },
];
