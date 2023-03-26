import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../utils/CatchAsync';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import { swapService } from '../services';

const createSwap = catchAsync(async (req: Request, res: Response) => {
  const swap = await swapService.createSwap(req.body);
  res.status(httpStatus.CREATED).send(swap);
});

const patchSwap = catchAsync(async (req: Request, res: Response) => {
  const swap = await swapService.patchSwap(req.body);
  res.status(httpStatus.CREATED).send(swap);
});

const getSwaps = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await swapService.querySwaps(filter, options);
  res.send(result);
});

const getSwap = catchAsync(async (req: Request, res: Response) => {
  const swap = await swapService.getSwapById(req.params.swapId);
  if (!swap) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Swap not found');
  }
  res.send(swap);
});

const updateSwap = catchAsync(async (req: Request, res: Response) => {
  const swap = await swapService.updateSwapById(req.params.swapId, req.body);
  res.send(swap);
});

const deleteSwap = catchAsync(async (req: Request, res: Response) => {
  await swapService.deleteSwapById(req.params.swapId);
  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  createSwap,
  patchSwap,
  getSwaps,
  getSwap,
  updateSwap,
  deleteSwap,
};
