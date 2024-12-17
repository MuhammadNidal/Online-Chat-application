import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Text,
  Link,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  VStack,
} from "@chakra-ui/react";
import { FaGithub, FaMoon, FaSun } from "react-icons/fa";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import ProfileMenu from "./ProfileMenu";
import chatContext from "../../context/chatContext";

const Navbar = (props) => {
  const context = useContext(chatContext);
  const { isAuthenticated } = context;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const colormode = localStorage.getItem("chakra-ui-color-mode");
  const [icon, setIcon] = useState(
    colormode === "dark" ? <FaSun /> : <FaMoon />
  );

  const path = window.location.pathname;

  const handleToggle = () => {
    if (colormode === "dark") {
      setIcon(<FaMoon />);
      props.toggleColorMode();
    } else {
      setIcon(<FaSun />);
      props.toggleColorMode();
    }
  };

  return (
    <Box>
      {/* Responsive Navbar */}
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        p={4}
        w="100%"
        boxShadow="sm"
        bg="white"
        borderBottomWidth={1}
      >
        {/* Logo */}
        <Text fontSize="2xl" fontWeight="bold">
          Chat Application
        </Text>

        {/* Desktop Navigation */}
        <Flex
          display={{ base: "none", md: "flex" }}
          align="center"
          gap={4}
        >
          <Button
            onClick={handleToggle}
            borderRadius="full"
            borderWidth={1}
            fontSize="sm"
            backgroundColor="transparent"
            p={3}
          >
            {icon}
          </Button>
          <Button
            borderRadius="full"
            borderWidth={1}
            fontSize="sm"
            backgroundColor="transparent"
            p={3}
            onClick={() => window.open("https://github.com/MuhammadNidal?tab=repositories")}
          >
            <FaGithub />
          </Button>
          {isAuthenticated && (
            <ProfileMenu isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
          )}
        </Flex>

        {/* Mobile Menu Icon */}
        <IconButton
          display={{ base: "flex", md: "none" }}
          icon={<HamburgerIcon />}
          aria-label="Open Menu"
          variant="ghost"
          onClick={onOpen}
        />
      </Flex>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <Flex justify="space-between" align="center">
              <Text fontSize="lg" fontWeight="bold">
                Menu
              </Text>
              <IconButton
                icon={<CloseIcon />}
                aria-label="Close Menu"
                variant="ghost"
                onClick={onClose}
              />
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            <VStack align="start" spacing={4}>
              <Button
                onClick={handleToggle}
                borderRadius="full"
                borderWidth={1}
                fontSize="sm"
                backgroundColor="transparent"
                p={3}
                w="100%"
              >
                {icon}
              </Button>
              <Button
                borderRadius="full"
                borderWidth={1}
                fontSize="sm"
                backgroundColor="transparent"
                p={3}
                onClick={() => window.open("https://github.com/MuhammadNidal?tab=repositories")}
                w="100%"
              >
                <FaGithub />
              </Button>
              {isAuthenticated && (
                <ProfileMenu isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
