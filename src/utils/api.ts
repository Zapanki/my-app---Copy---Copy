// Import necessary modules from `@trpc/client` and `@trpc/next`
import { httpBatchLink, loggerLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
// Import the AppRouter type to provide type-safety for API calls
import type { AppRouter } from '../server/routers/_app';

// Function to determine the base URL depending on the environment (browser or server)
const getBaseUrl = () => {
  // If running in the browser, use a relative URL for API calls
  if (typeof window !== 'undefined') return '';
  // If running on the server, use the localhost URL with the specified port (or 3000 by default)
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

// Create and export the tRPC client configuration for the app, setting up links and options
export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      // Define the chain of links that handle requests
      links: [
        loggerLink(), // Logs each request for debugging
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`, // Sets the API endpoint
        }),
      ],
      // Removed transformer configuration (optional, for basic use cases)
    };
  },
  // Disable server-side rendering for this API configuration
  ssr: false,
});
