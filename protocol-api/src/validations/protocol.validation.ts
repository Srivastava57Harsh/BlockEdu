import z from 'zod';
import { Types } from 'mongoose';

const createProtocol = z.object({
  body: z.object({
    amount_c: z.number(),
    amount_cx: z.number(),
    amount_cy: z.number(),
    amount_c_incentive: z.number(),
    network: z.string(),
  }),
});

const getProtocols = z.object({
  query: z
    .object({
      amount_c: z.number(),
      amount_cx: z.number(),
      amount_cy: z.number(),
      amount_c_incentive: z.number(),
      network: z.string(),
      sortBy: z.string(),
      page: z.number().int(),
      limit: z.number().int(),
    })
    .partial(),
});

const getProtocol = z.object({
  params: z.object({
    protocolId: z.string().refine((id) => Types.ObjectId.isValid(id), {
      message: 'Invalid protocol id',
      path: ['Protocol Query'],
    }),
  }),
});

const updateProtocol = z.object({
  params: z.object({
    protocolId: z.string().refine((id) => Types.ObjectId.isValid(id), {
      message: 'Invalid protocol id',
      path: ['Protocol Update'],
    }),
  }),
  body: z
    .object({
      amount_c: z.number(),
      amount_cx: z.number(),
      amount_cy: z.number(),
      amount_c_incentive: z.number(),
      network: z.string(),
    })
    .partial()
    .refine((body) => Object.keys(body).length > 0, {
      message: 'Need atleast one field to update',
      path: ['Protocol Update'],
    }),
});

const deleteProtocol = z.object({
  params: z.object({
    protocolId: z.string().refine((id) => Types.ObjectId.isValid(id), {
      message: 'Invalid protocol id',
      path: ['Protocol Delete'],
    }),
  }),
});

export default {
  createProtocol,
  getProtocols,
  getProtocol,
  updateProtocol,
  deleteProtocol,
};
