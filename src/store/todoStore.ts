// Import the `create` function from `zustand`, which is used to define a new store
import { create } from 'zustand';

// Define the structure of a single Todo item with an `id` and a `title`
interface Todo {
  id: number;
  title: string;
}

// Define the structure of the TodoStore, which includes:
// - `todos`: an array of Todo items
// - `addTodo`: a function to add a new Todo item to the list
interface TodoStore {
  todos: Todo[]; // The list of todos in the store
  addTodo: (todo: Todo) => void; // Function to add a new todo to the store
}

// Initialize the `useTodoStore` hook using `create`, which sets up the Todo store
export const useTodoStore = create<TodoStore>((set) => ({
  // Initialize `todos` as an empty array
  todos: [],

  // Define `addTodo` to add a new Todo item to the `todos` array in the store
  addTodo: (todo: Todo) =>
    // Update the store's state by adding the new `todo` to the existing list
    set((state: TodoStore) => ({ todos: [...state.todos, todo] })),
}));
