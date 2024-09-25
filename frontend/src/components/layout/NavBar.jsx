import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  Box,
  Flex,
  Button,
  VStack,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Link,
} from "@chakra-ui/react";

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userRole, setUserRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      try {
        const decodedToken = jwtDecode(token);
        setUserRole(decodedToken.role);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      setIsLoggedIn(false);
      setUserRole(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserRole(null);
    navigate("/login");
  };

  const NavLink = ({ to, children }) => (
    <Link as={RouterLink} to={to} onClick={onClose} fontSize="lg" mb={4}>
      {children}
    </Link>
  );

  if (!isLoggedIn) {
    return null;
  }

  return (
    <Box>
      <Flex align="center" p={4}>
        <Button
          onClick={onOpen}
          variant="outline"
          aria-label="Open Menu"
        >
          ☰
        </Button>
      </Flex>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Navigation</DrawerHeader>
          <DrawerBody>
            <VStack align="stretch" spacing={4}>
              {userRole === "admin" && (
                <>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                  <NavLink to="/profile">Profile</NavLink>
                  <NavLink to="/settings">Settings</NavLink>
                </>
              )}
              {userRole === "transporter" && (
                <>
                  <NavLink to="/transporter-dashboard">Patient Transport Dashboard</NavLink>
                  <NavLink to="/profile">Profile</NavLink>
                  <NavLink to="/settings">Settings</NavLink>
                </>
              )}
              <Link onClick={handleLogout} fontSize="lg" mb={4}>
                Logout
              </Link>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default NavBar;
