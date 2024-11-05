import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Heading,
  VStack,
  useToast,
} from '@chakra-ui/react';

const RegisterForm = () => {
  // State variables to store input values
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toast = useToast(); // Toast for displaying notifications

  // Function to handle registration form submission
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload on form submission

    // Check if passwords match before sending request
    if (password !== confirmPassword) {
      toast({
        title: 'Password Mismatch',
        description: 'Passwords do not match. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Send registration data to the backend
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username, password }),
    });

    if (response.ok) {
      toast({
        title: 'Registration Successful',
        description: 'User registered successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Registration Failed',
        description: 'Failed to register user. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      maxW="400px"
      mx="auto"
      mt="10"
      p="8"
      borderRadius="md"
      boxShadow="lg"
      bg="white"
    >
      <Heading textAlign="center" mb="6" fontSize="2xl" color="teal.500">
        Register
      </Heading>
      <form onSubmit={handleRegister}>
        <VStack spacing="4">
          {/* Email Field */}
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              variant="filled"
            />
            <FormHelperText>Your email will remain private</FormHelperText>
          </FormControl>

          {/* Username Field */}
          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
              variant="filled"
            />
          </FormControl>

          {/* Password Field */}
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter a password"
              variant="filled"
            />
          </FormControl>

          {/* Confirm Password Field */}
          <FormControl id="confirmPassword" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              variant="filled"
            />
          </FormControl>

          {/* Submit Button */}
          <Button type="submit" colorScheme="teal" size="lg" width="full">
            Register
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default RegisterForm;
