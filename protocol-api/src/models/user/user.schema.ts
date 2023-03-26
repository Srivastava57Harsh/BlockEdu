import { Schema } from 'mongoose';
import { setLastUpdated } from './user.methods';
import { toJSON, paginate } from '../plugins';

const UserSchema = new Schema({
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
  amount_c: {
    type: Number,
    required: true,
    trim: true,
  },
  amount_cx: {
    type: Number,
    default: 0,
    trim: true,
  },
  amount_cy: {
    type: Number,
    default: 0,
    trim: true,
  },
  network: {
    type: String,
    trim: true,
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

UserSchema.plugin(toJSON);
UserSchema.plugin(paginate);
UserSchema.methods.setLastUpdated = setLastUpdated;

export default UserSchema;
