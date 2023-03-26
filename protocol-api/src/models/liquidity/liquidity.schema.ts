import { Schema } from 'mongoose';
import { setLastUpdated } from './liquidity.methods';
import { toJSON, paginate } from '../plugins';

const LiquiditySchema = new Schema({
  addr: {
    type: String,
    required: true,
    trim: true,
  },
  amount_A: {
    type: Number,
    required: true,
    trim: true,
  },
  amount_B: {
    type: Number,
    required: true,
    trim: true,
  },
  isRemoved: {
    type: Boolean,
    default: false,
  },
  dateOfEntry: {
    type: Date,
    default: new Date(),
  },
  lastUpdated: {
    type: Date,
    default: new Date(),
  },
});

LiquiditySchema.plugin(toJSON);
LiquiditySchema.plugin(paginate);
LiquiditySchema.methods.setLastUpdated = setLastUpdated;

export default LiquiditySchema;
