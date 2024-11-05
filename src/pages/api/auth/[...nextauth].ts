// src/pages/api/auth/[...nextauth].ts

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/server/prisma'; // Prisma client for database access
import bcrypt from 'bcrypt'; // Used for password hashing

export default NextAuth({
  // Define authentication providers
  providers: [
    CredentialsProvider({
      name: 'Credentials', // Authentication method name
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Fetch user from the database by username
        const user = await prisma.user.findUnique({
          where: { username: credentials?.username },
        });

        // If user exists and password matches, return user data
        if (user && credentials?.password) {
          const isValidPassword = await bcrypt.compare(credentials.password, user.password);
          if (isValidPassword) return user;
        }
        // Return null if authentication fails
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt', // Use JSON Web Tokens (JWT) for session handling
  },
  callbacks: {
    // Set JWT token properties after authentication
    async jwt({ token, user }) {
      if (user) {
        // Add user-specific details to the token
        token.id = user.id;
        token.username = user.username;
        token.profilePicture = user.profilePicture;
      }
      return token; // Return updated token
    },
    // Modify session to include custom user properties
    async session({ session, token }) {
      session.userId = token.id as number; // Assign userId to session
      session.user = {
        id: token.id as number,
        username: token.username as string,
        profilePicture: token.profilePicture as string,
      };
      return session; // Return updated session
    },
  },
  pages: {
    signIn: '/login', // Custom sign-in page route
  },
});
