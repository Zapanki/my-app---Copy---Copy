// src/server/trpc.ts

import { initTRPC } from '@trpc/server'; // Importing the core TRPC initialization function
import { z } from 'zod'; // Importing Zod for schema validation

// Initialize TRPC for setting up the server and routing
const t = initTRPC.create();

// Define the base router for grouping multiple route handlers
export const router = t.router;

// Define a public procedure that can be accessed without authentication
export const publicProcedure = t.procedure;
