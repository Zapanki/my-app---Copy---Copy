// src/components/UserProfile.tsx

import { signOut, useSession } from 'next-auth/react';
import { Box, Button, Text, Image } from '@chakra-ui/react';

const UserProfile = () => {
  // Fetching session data to check if user is logged in
  const { data: session } = useSession();

  return (
    <Box p={4} borderWidth="1px" borderRadius="md" bg="gray.50" maxW="300px" textAlign="center">
      {session ? (
        <>
          {/* Display user's profile picture with a fallback */}
          <Image
            borderRadius="full"
            boxSize="100px"
            src={session.user?.profilePicture || 'https://via.placeholder.com/150'}
            alt="Profile Picture"
            mb={4}
          />
          {/* Display user's username */}
          <Text fontSize="lg" fontWeight="bold">
            {session.user?.username}
          </Text>
          {/* Sign Out button */}
          <Button mt={4} colorScheme="red" onClick={() => signOut()}>
            Sign Out
          </Button>
        </>
      ) : (
        // Message for users who are not logged in
        <Text>Please log in to view your profile.</Text>
      )}
    </Box>
  );
};

export default UserProfile;
