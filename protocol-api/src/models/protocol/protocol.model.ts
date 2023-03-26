import { model } from 'mongoose';
import { IProtocolDocument, IProtocolModel } from './protocol.types';
import ProtocolSchema from './protocol.schema';

const ProtocolModel = model<IProtocolDocument, IProtocolModel>(
  'protocol',
  ProtocolSchema
);
export default ProtocolModel;
