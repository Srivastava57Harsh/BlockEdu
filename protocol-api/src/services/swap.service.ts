import httpStatus from 'http-status';
import { SwapUpdate } from '../shared/customTypes';
import SwapModel from '../models/swap/swap.model';
import ApiError from '../utils/ApiError';

const createSwap = async (swap: any) => {
  return SwapModel.create({
    addr: swap.args[0],
    amount_A_Out: parseInt(swap.args[1].hex),
    amount_B_Out: parseInt(swap.args[2].hex),
    amount_A_In: parseInt(swap.args[3].hex),
    amount_B_In: parseInt(swap.args[4].hex),
  });
};

const patchSwap = async (swap: any) => {
  const sw = await SwapModel.find({ addr: swap.addr });
  Object.assign(sw, {
    amount_A_Out: parseInt(swap.args[1].hex),
    amount_B_Out: parseInt(swap.args[2].hex),
    amount_A_In: parseInt(swap.args[3].hex),
    amount_B_In: parseInt(swap.args[4].hex),
  });
  await sw.save();
  return sw;
};

const querySwaps = async (filter: any, options: any) => {
  const swaps = await SwapModel.paginate(filter, options);
  return swaps;
};

const getSwapById = async (id: string) => {
  SwapModel.findById(id);
};

const updateSwapById = async (id: string, updateBody: SwapUpdate) => {
  const swap = await getSwapById(id);
  if (!swap) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Swap not found');
  }
  Object.assign(swap, updateBody);
  await swap.save();
  return swap;
};

const deleteSwapById = async (id: string) => {
  const swap = await getSwapById(id);
  if (!swap) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Swap not found');
  }
  await swap.remove();
  return swap;
};

export default {
  createSwap,
  patchSwap,
  querySwaps,
  getSwapById,
  updateSwapById,
  deleteSwapById,
};
