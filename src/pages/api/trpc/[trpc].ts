// src/pages/api/trpc/[trpc].ts

import { createNextApiHandler } from '@trpc/server/adapters/next';
import { appRouter } from '../../../server/routers/_app'; // Import the main application router

// Set up and export the Next.js API handler for tRPC
export default createNextApiHandler({
  router: appRouter, // The main tRPC router to handle all tRPC API requests
  createContext: () => ({}), // The context, can be used for request-specific data (e.g., auth)
});
