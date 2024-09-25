import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/auth";
import { Box, Button, FormControl, FormLabel, Input, Heading, Text, Flex } from "@chakra-ui/react";

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
      bg="gray.100"
    >
      <Box maxW="sm" mx="auto" mt="10" p="6" borderWidth="1px" borderRadius="lg" boxShadow="lg" bg="white">
        <Heading as="h2" size="lg" mb="6">Login</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl id="username" mb="4">
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </FormControl>
          <FormControl id="password" mb="4">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormControl>
          {error && <Text color="red.500" mb="4">{error}</Text>}
          <Button type="submit" colorScheme="teal" width="full">Login</Button>
        </form>
      </Box>
    </Flex>
  );
};

export default Login;
