import { model } from 'mongoose';
import { ILiquidityDocument, ILiquidityModel } from './liquidity.types';
import LiquiditySchema from './liquidity.schema';

const LiquidityModel = model<ILiquidityDocument, ILiquidityModel>(
  'liquidity',
  LiquiditySchema
);
export default LiquidityModel;
