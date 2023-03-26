import { Schema } from 'mongoose';
import { toJSON, paginate } from '../plugins';
import { setLastUpdated } from './swap.methods';

const SwapSchema = new Schema({
  addr: {
    type: String,
    required: true,
    trim: true,
  },
  amount_A_Out: {
    type: Number,
    required: true,
    trim: true,
  },
  amount_A_In: {
    type: Number,
    required: true,
    trim: true,
  },
  amount_B_Out: {
    type: Number,
    required: true,
    trim: true,
  },
  amount_B_In: {
    type: Number,
    required: true,
    trim: true,
  },
});

SwapSchema.plugin(toJSON);
SwapSchema.plugin(paginate);
SwapSchema.methods.setLastUpdated = setLastUpdated;

export default SwapSchema;
