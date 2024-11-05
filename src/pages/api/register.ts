// src/pages/api/register.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../server/prisma'; // Ensure the path to prisma is correct
import bcrypt from 'bcrypt';

// Handler function for user registration
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Restrict to POST method only
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
    return;
  }

  // Destructure email, username, and password from the request body
  const { email, username, password } = req.body;

  // Basic validation checks
  if (!email || !username || !password) {
    return res.status(400).json({ error: 'Email, username, and password are required.' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
  }
  if (username.length < 3 || username.length > 20) {
    return res.status(400).json({ error: 'Username must be between 3 and 20 characters.' });
  }

  try {
    // Hash the password for secure storage
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    // Respond with the created user
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);

    // Check for unique constraint errors, such as duplicate email or username
    if (error === 'P2002') {
      return res.status(409).json({ error: 'Email or username already exists.' });
    }

    // General error response
    res.status(500).json({ error: 'Error creating user', details: error });
  }
}
