// src/server/routers/_app.ts

import { router } from '../trpc';
import { exampleRouter } from './exampleRouter'; // Import exampleRouter for example routes
import { taskRouter } from './taskRouter';       // Import taskRouter for task-related routes

// Combine the example and task routers into the main appRouter
export const appRouter = router({
  example: exampleRouter, // Route prefix for example-related routes
  task: taskRouter,       // Route prefix for task-related routes
});

// Export the type of appRouter for use in type-safe routing across the app
export type AppRouter = typeof appRouter;
