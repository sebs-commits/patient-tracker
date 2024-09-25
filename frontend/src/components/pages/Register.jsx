import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/auth";
import { Box, Button, FormControl, FormLabel, Input, Heading, VStack, Select, Text, Flex } from "@chakra-ui/react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin"); // Default role
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ username, password, role });
      navigate("/login"); // Redirect to login after successful registration
    } catch (err) {
      setError("Registration failed. Please try again.", err);
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
        <Heading as="h2" size="lg" mb="6" color="blue.700">Register</Heading>
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
            <FormControl id="role" isRequired>
              <FormLabel color="blue.700">Role</FormLabel>
              <Select value={role} onChange={(e) => setRole(e.target.value)} required width="full">
                <option value="admin">Admin</option>
                <option value="transporter">Transporter</option>
              </Select>
            </FormControl>
            {error && <Text color="red.500">{error}</Text>}
            <Button type="submit" colorScheme="blue" width="full">Register</Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default Register;