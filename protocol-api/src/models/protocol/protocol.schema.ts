import { Schema } from 'mongoose';
import { setLastUpdated } from './protocol.methods';
import { toJSON, paginate } from '../plugins';

const ProtocolSchema = new Schema({
  amount_c: {
    type: Number,
    required: true,
    trim: true,
  },
  amount_cx: {
    type: Number,
    required: true,
    trim: true,
  },
  amount_cy: {
    type: Number,
    required: true,
    trim: true,
  },
  amount_c_incentive: {
    type: Number,
    required: true,
    trim: true,
  },
  network: {
    type: String,
    trim: true,
  },
  isDivest: {
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

ProtocolSchema.plugin(toJSON);
ProtocolSchema.plugin(paginate);
ProtocolSchema.methods.setLastUpdated = setLastUpdated;

export default ProtocolSchema;
