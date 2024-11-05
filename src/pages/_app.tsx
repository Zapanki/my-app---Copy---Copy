// src/pages/_app.tsx

import { ChakraProvider } from '@chakra-ui/react'; // Provides Chakra UI's styling and components
import { trpc } from '../utils/api'; // Imports tRPC config to enable API calls
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // React Query for caching and syncing server state
import { useState } from 'react';
import { SessionProvider } from 'next-auth/react'; // Session provider from NextAuth for authentication

function MyApp({ Component, pageProps }: AppProps) {
  // Initialize React Query client to manage server-state caching
  const [queryClient] = useState(() => new QueryClient());

  return (
    // Provides session context to the entire application, handling authentication state
    <SessionProvider session={pageProps.session}>
      {/* QueryClientProvider gives access to React Query’s caching and server-state management */}
      <QueryClientProvider client={queryClient}>
        {/* ChakraProvider wraps the app with Chakra UI theming and component styles */}
        <ChakraProvider>
          {/* Main application component that renders the requested page */}
          <Component {...pageProps} />
        </ChakraProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

// Wraps the application with tRPC to enable type-safe API calls
export default trpc.withTRPC(MyApp);
