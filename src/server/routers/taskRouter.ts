// src/server/routers/taskRouter.ts
import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import prisma from '../prisma';

// Определяем схему для валидации заголовка задачи с ограничениями по длине
const taskTitleSchema = z
  .string()
  .min(3, 'Заголовок задачи должен содержать не менее 3 символов')
  .max(50, 'Заголовок задачи должен содержать не более 50 символов');

export const taskRouter = router({
  // Получение всех задач
  getTasks: publicProcedure.query(async () => {
    return prisma.task.findMany();
  }),

  // Добавление новой задачи с валидацией заголовка
  addTask: publicProcedure
    .input(z.object({ title: taskTitleSchema })) // Применение схемы валидации для заголовка
    .mutation(async ({ input }) => {
      return prisma.task.create({
        data: {
          title: input.title,
          completed: false,
        },
      });
    }),

  // Обновление задачи с опциональной валидацией заголовка
  updateTask: publicProcedure
    .input(
      z.object({
        id: z.number(),
        title: taskTitleSchema.optional(), // Применение схемы валидации для опционального заголовка
        completed: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return prisma.task.update({
        where: { id: input.id },
        data: {
          title: input.title, // Обновление заголовка, если он передан и соответствует требованиям
          completed: input.completed, // Обновление статуса, если он передан
        },
      });
    }),

  // Удаление задачи
  deleteTask: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return prisma.task.delete({
        where: { id: input.id },
      });
    }),
});
