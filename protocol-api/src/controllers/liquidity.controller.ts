import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../utils/CatchAsync';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import { liquidityService } from '../services';

const createLiquidity = catchAsync(async (req: Request, res: Response) => {
  const liquidity = await liquidityService.createLiquidity(req.body);
  res.status(httpStatus.CREATED).send(liquidity);
});

const patchLiquidity = catchAsync(async (req: Request, res: Response) => {
  const liquidity = await liquidityService.patchLiquidity(req.body);
  res.status(httpStatus.CREATED).send(liquidity);
});

const getLiquiditys = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await liquidityService.queryLiquiditys(filter, options);
  res.send(result);
});

const getLiquidity = catchAsync(async (req: Request, res: Response) => {
  const liquidity = await liquidityService.getLiquidityById(
    req.params.liquidityId
  );
  if (!liquidity) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Liquidity not found');
  }
  res.send(liquidity);
});

const updateLiquidity = catchAsync(async (req: Request, res: Response) => {
  const liquidity = await liquidityService.updateLiquidityById(
    req.params.liquidityId,
    req.body
  );
  res.send(liquidity);
});

const deleteLiquidity = catchAsync(async (req: Request, res: Response) => {
  await liquidityService.deleteLiquidityById(req.params.liquidityId);
  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  createLiquidity,
  patchLiquidity,
  getLiquiditys,
  getLiquidity,
  updateLiquidity,
  deleteLiquidity,
};
