// src/server/prisma.ts

import { PrismaClient } from '@prisma/client';

// Initialize a single PrismaClient instance to interact with the database
const prisma = new PrismaClient();

// Export the PrismaClient instance to be used across the application
export default prisma;
