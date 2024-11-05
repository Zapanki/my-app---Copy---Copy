// src/server/routers/exampleRouter.ts

import { router, publicProcedure } from '../trpc';
import { z } from 'zod';

export const exampleRouter = router({
  // Method to retrieve a list of items
  getItems: publicProcedure.query(async () => {
    // Returning a static example item for demonstration
    return [{ id: 1, title: 'Example Item' }];
  }),

  // Method to add a new item
  addItem: publicProcedure
    .input(
      // Validation schema to ensure title is provided and is a string
      z.object({ title: z.string() })
    )
    .mutation(async ({ input }) => {
      // Simulating item creation with a random ID and provided title
      return { id: Math.random(), title: input.title };
    }),
});
