import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import {
  Box,
  Button,
  Input,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  FormHelperText,
  Text,
  useToast,
} from '@chakra-ui/react';

const LoginPage = () => {
  // State variables to hold username and password values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Next.js router for page navigation
  const toast = useToast(); // Chakra UI's toast for notifications

  // Handler for login button click
  const handleLogin = async () => {
    // Attempt to sign in using NextAuth credentials
    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    if (result && result.ok) {
      // Redirect to the home page if login is successful
      router.push('/');
    } else {
      // Show error notification if login fails
      toast({
        title: 'Login Failed',
        description: 'Invalid username or password.',
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
      {/* Heading for the login form */}
      <Heading textAlign="center" mb="6" fontSize="2xl" color="teal.500">
        Login
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
          <FormHelperText color="gray.500">
            Enter your password to sign in
          </FormHelperText>
        </FormControl>

        {/* Login button */}
        <Button
          colorScheme="teal"
          size="lg"
          width="full"
          mt="4"
          onClick={handleLogin}
        >
          Login
        </Button>

        {/* Registration link */}
        <Text color="gray.600" fontSize="sm">
          Don't have an account?{' '}
          <Button
            variant="link"
            colorScheme="blue"
            onClick={() => router.push('/register')}
          >
            Register here
          </Button>
        </Text>
      </VStack>
    </Box>
  );
};

export default LoginPage;
