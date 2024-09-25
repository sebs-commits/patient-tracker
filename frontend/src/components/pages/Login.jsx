import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/auth";
import { Box, Button, FormControl, FormLabel, Input, Heading, Text, Flex, VStack } from "@chakra-ui/react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await loginUser({ username, password });
      localStorage.setItem("token", token); // Store JWT token in localStorage
      navigate("/dashboard"); // Redirect to dashboard after successful login
    } catch (err) {
      setError("Invalid credentials. Please try again.", err);
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
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default Login;