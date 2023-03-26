import httpStatus from 'http-status';
import { LiquidityUpdate } from '../shared/customTypes';
import LiquidityModel from '../models/liquidity/liquidity.model';
import ApiError from '../utils/ApiError';

const createLiquidity = async (liquidity: any) => {
  return LiquidityModel.create({
    addr: liquidity.args[0],
    amount_A: parseInt(liquidity.args[1].hex),
    amount_B: parseInt(liquidity.args[2].hex),
  });
};

const patchLiquidity = async (liquidity: any) => {
  const liq = await LiquidityModel.find({ addr: liquidity.addr });
  Object.assign(liq, {
    amount_A: parseInt(liquidity.args[1].hex),
    amount_B: parseInt(liquidity.args[2].hex),
    isRemoved: true,
  });
  await liq.save();
  return liq;
};

const queryLiquiditys = async (filter: any, options: any) => {
  const liquiditys = await LiquidityModel.paginate(filter, options);
  return liquiditys;
};

const getLiquidityById = async (id: string) => {
  LiquidityModel.findById(id);
};

const updateLiquidityById = async (id: string, updateBody: LiquidityUpdate) => {
  const liquidity = await getLiquidityById(id);
  if (!liquidity) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Liquidity not found');
  }
  Object.assign(liquidity, updateBody);
  await liquidity.save();
  return liquidity;
};

const deleteLiquidityById = async (id: string) => {
  const liquidity = await getLiquidityById(id);
  if (!liquidity) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Liquidity not found');
  }
  await liquidity.remove();
  return liquidity;
};

export default {
  createLiquidity,
  patchLiquidity,
  queryLiquiditys,
  getLiquidityById,
  updateLiquidityById,
  deleteLiquidityById,
};
