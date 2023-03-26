import z from 'zod';
import { Types } from 'mongoose';

const createUser = z.object({
  body: z.object({
    addr: z.string().trim(),
    amount_A: z.number(),
    amount_B: z.number(),
    amount_c: z.number(),
    amount_cx: z.number(),
    amount_cy: z.number(),
  }),
});

const getUsers = z.object({
  query: z
    .object({
      addr: z.string().trim(),
      amount_A: z.number(),
      amount_B: z.number(),
      amount_c: z.number(),
      amount_cx: z.number(),
      amount_cy: z.number(),
      sortBy: z.string(),
      page: z.number().int(),
      limit: z.number().int(),
    })
    .partial(),
});

const getUser = z.object({
  params: z.object({
    investId: z.string().refine((id) => Types.ObjectId.isValid(id), {
      message: 'Invalid invest id',
      path: ['Invest Query'],
    }),
  }),
});

const updateUser = z.object({
  params: z.object({
    userId: z.string().refine((id) => Types.ObjectId.isValid(id), {
      message: 'Invalid user id',
      path: ['User Update'],
    }),
  }),
  body: z
    .object({
      addr: z.string().trim(),
      amount_A: z.number(),
      amount_B: z.number(),
      amount_c: z.number(),
      amount_cx: z.number(),
      amount_cy: z.number(),
    })
    .partial()
    .refine((body) => Object.keys(body).length > 0, {
      message: 'Need atleast one field to update',
      path: ['User Update'],
    }),
});

const deleteUser = z.object({
  params: z.object({
    userId: z.string().refine((id) => Types.ObjectId.isValid(id), {
      message: 'Invalid user id',
      path: ['User Delete'],
    }),
  }),
});

export default { createUser, getUsers, getUser, updateUser, deleteUser };
