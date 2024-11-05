// src/pages/tasks.tsx

import { useSession, signOut } from 'next-auth/react';
import { useState, useRef } from 'react';
import {
  Box,
  Button,
  Input,
  Stack,
  Heading,
  IconButton,
  Flex,
  Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { trpc } from '../utils/api';

const TasksPage = () => {
  // Session data to manage user authentication status
  const { data: session } = useSession();

  // State variables for managing tasks and task editing/deletion
  const [newTask, setNewTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingTaskTitle, setEditingTaskTitle] = useState('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState<number | null>(null);

  const cancelRef = useRef<HTMLButtonElement>(null); // Reference for alert dialog

  // Fetch tasks and define task-related mutations
  const { data: tasks, refetch } = trpc.task.getTasks.useQuery();
  const addTask = trpc.task.addTask.useMutation({
    onSuccess: () => {
      refetch();
      setNewTask(''); // Reset new task input field after adding
    },
  });
  const deleteTask = trpc.task.deleteTask.useMutation({
    onSuccess: () => {
      refetch();
      setIsDeleteDialogOpen(false); // Close delete confirmation dialog
    },
  });
  const updateTask = trpc.task.updateTask.useMutation({
    onSuccess: () => {
      refetch();
      setEditingTaskId(null); // Clear editing state after update
      setEditingTaskTitle(''); // Reset editing title input
    },
  });

  // Add a new task
  const handleAddTask = () => {
    if (newTask) {
      addTask.mutate({ title: newTask });
    }
  };

  // Begin editing a specific task
  const handleEditTask = (taskId: number, currentTitle: string) => {
    setEditingTaskId(taskId);
    setEditingTaskTitle(currentTitle);
  };

  // Update the task with new title and/or completed status
  const handleUpdateTask = () => {
    if (editingTaskId !== null && editingTaskTitle) {
      updateTask.mutate({ id: editingTaskId, title: editingTaskTitle });
    }
  };

  // Cancel task editing mode
  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditingTaskTitle('');
  };

  // Open delete confirmation dialog for a specific task
  const handleDeleteTask = (taskId: number) => {
    setTaskIdToDelete(taskId);
    setIsDeleteDialogOpen(true);
  };

  // Confirm task deletion
  const confirmDeleteTask = () => {
    if (taskIdToDelete !== null) {
      deleteTask.mutate({ id: taskIdToDelete });
    }
  };

  return (
    <Box maxW="600px" mx="auto" p={5}>
      {/* Page Header with Sign In/Out Controls */}
      <Flex justify="space-between" align="center" mb={5}>
        <Heading>Todo List</Heading>
        <Flex align="center">
          {session ? (
            <>
              <Text mr={4}>Hello, {session.user?.username}</Text>
              <Button colorScheme="red" onClick={() => signOut()}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button
                mr={2}
                colorScheme="teal"
                onClick={() => (window.location.href = '/login')}
              >
                Sign In
              </Button>
              <Button
                colorScheme="blue"
                onClick={() => (window.location.href = '/register')}
              >
                Register
              </Button>
            </>
          )}
        </Flex>
      </Flex>

      {/* Task List Display */}
      <Stack spacing={4} mb={4}>
        {tasks?.map((task) => (
          <Box
            key={task.id}
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            bg="gray.100"
            shadow="md"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            {editingTaskId === task.id ? (
              // Input field for task editing mode
              <Input
                value={editingTaskTitle}
                onChange={(e) => setEditingTaskTitle(e.target.value)}
                placeholder="Enter new task title"
              />
            ) : (
              <Text>{task.title}</Text>
            )}
            <Flex>
              {editingTaskId === task.id ? (
                <>
                  {/* Save and Cancel buttons during edit mode */}
                  <Button colorScheme="green" onClick={handleUpdateTask} mr={2}>
                    Save
                  </Button>
                  <Button colorScheme="red" onClick={handleCancelEdit} mr={2}>
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  {/* Edit and Delete buttons when not editing */}
                  <IconButton
                    icon={<EditIcon />}
                    aria-label="Edit Task"
                    size="sm"
                    colorScheme="yellow"
                    mr={2}
                    onClick={() => handleEditTask(task.id, task.title)}
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    aria-label="Delete Task"
                    size="sm"
                    colorScheme="red"
                    onClick={() => handleDeleteTask(task.id)}
                  />
                </>
              )}
            </Flex>
          </Box>
        ))}
      </Stack>

      {/* Add New Task Section */}
      <Box mt={6} display="flex" alignItems="center">
        <Input
          placeholder="Enter new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          mr={2}
        />
        <Button colorScheme="teal" onClick={handleAddTask}>
          Add Task
        </Button>
      </Box>

      {/* Confirmation Dialog for Task Deletion */}
      <AlertDialog
        isOpen={isDeleteDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Task
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this task? This action cannot be
              undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={confirmDeleteTask} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default TasksPage;
