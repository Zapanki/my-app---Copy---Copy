// src/pages/api/user/updateProfile.ts

import prisma from '../../../server/prisma'; // Prisma client to interact with the database
import type { NextApiRequest, NextApiResponse } from 'next';

// Main handler function for the endpoint
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle only POST requests
  if (req.method === 'POST') {
    const { userId, profilePicture } = req.body;

    // Basic validation to ensure userId and profilePicture are provided
    if (!userId || !profilePicture) {
      return res.status(400).json({ error: 'User ID and Profile Picture are required.' });
    }

    try {
      // Update the user's profile picture in the database
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { profilePicture },
      });

      // Respond with the updated user object if successful
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ error: 'Failed to update profile.' });
    }
  } else {
    // Respond with a 405 if the method is not POST
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
