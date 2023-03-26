import { model } from 'mongoose';
import { ISwapDocument, ISwapModel } from './swap.types';
import SwapSchema from './swap.schema';

const SwapModel = model<ISwapDocument, ISwapModel>('swap', SwapSchema);
export default SwapModel;
