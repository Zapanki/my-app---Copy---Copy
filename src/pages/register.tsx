// src/pages/register.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Input,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Text,
  useToast,
} from '@chakra-ui/react';

const RegisterPage = () => {
  // State variables to handle form inputs
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const router = useRouter(); // Router instance for page navigation
  const toast = useToast(); // Toast for showing notifications

  // Function to handle registration logic
  const handleRegister = async () => {
    // Check if password and confirm password match
    if (password !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Send registration data to the backend
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    // Handle the response from the registration API
    if (response.ok) {
      toast({
        title: 'Registration Successful',
        description: 'You can now log in.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      router.push('/login'); // Redirect to login page after success
    } else {
      toast({
        title: 'Registration Error',
        description: 'Failed to register. Please try again.',
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
      <VStack spacing="4">
        {/* Username field */}
        <FormControl id="username">
          <FormLabel>Username</FormLabel>
          <Input
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="filled"
          />
        </FormControl>

        {/* Email field */}
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="filled"
          />
        </FormControl>

        {/* Password field */}
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="filled"
          />
        </FormControl>

        {/* Confirm Password field */}
        <FormControl id="confirmPassword">
          <FormLabel>Confirm Password</FormLabel>
          <Input
            placeholder="Confirm your password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            variant="filled"
          />
        </FormControl>

        {/* Register button */}
        <Button colorScheme="teal" size="lg" width="full" mt="4" onClick={handleRegister}>
          Register
        </Button>

        {/* Link to the login page */}
        <Text color="gray.600" fontSize="sm">
          Already have an account?{' '}
          <Button
            variant="link"
            colorScheme="blue"
            onClick={() => router.push('/login')}
          >
            Log in here
          </Button>
        </Text>
      </VStack>
    </Box>
  );
};

export default RegisterPage;
