import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/auth";
import { Box, Button, FormControl, FormLabel, Input, Heading, Text, Flex, VStack, HStack } from "@chakra-ui/react";

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Function to handle login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await loginUser({ username, password });
      localStorage.setItem("token", token);
      setIsLoggedIn(true); // Update the login status
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  // Function to handle demo login
  const handleDemoLogin = (userType) => {
    if (userType === "admin") {
      setUsername("adminuser"); 
      setPassword("password123");  
    } else if (userType === "transporter") {
      setUsername("transporter"); 
      setPassword("password123");  
    }
  };

  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      bg="blue.100"
    >
      <Box 
        maxW={{ base: "90%", sm: "80%", md: "70%", lg: "50%", xl: "50%" }} 
        width="full"
        mx="auto" 
        mt="10" 
        p="6" 
        borderWidth="1px" 
        borderRadius="lg" 
        boxShadow="lg" 
        bg="white"
      >
        <Heading as="h2" size="lg" mb="6" color="blue.700">Login</Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing="4" width="full">
            <FormControl id="username" isRequired>
              <FormLabel color="blue.700">Username</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                width="full"
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel color="blue.700">Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                width="full"
              />
            </FormControl>
            {error && <Text color="red.500">{error}</Text>}
            <Button type="submit" colorScheme="blue" width="full">Login</Button>
            <HStack spacing="4" width="full" mt="4"> 
              <Button 
                onClick={() => handleDemoLogin("admin")} 
                colorScheme="teal" 
                width="full"
              >
                Demo Login as Admin
              </Button>
              <Button 
                onClick={() => handleDemoLogin("transporter")} 
                colorScheme="teal" 
                width="full"
              >
                Demo Login as Transporter
              </Button>
            </HStack>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default Login;