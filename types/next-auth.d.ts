// types/next-auth.d.ts

import NextAuth from 'next-auth';

// Extend NextAuth types to add custom fields
declare module 'next-auth' {
  // Extend Session interface to include additional user properties
  interface Session {
    userId: number; // User ID accessible from session.userId
    user: {
      id: number; // User ID inside session.user
      username: string; // Username property
      profilePicture: string; // URL for profile picture
    };
  }

  // Extend User interface to define shape of user objects
  interface User {
    id: number; // Unique identifier for the user
    username: string; // Username of the user
    profilePicture: string; // URL for profile picture
  }
}
