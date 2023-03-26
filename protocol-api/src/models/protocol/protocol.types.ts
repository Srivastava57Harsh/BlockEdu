import { Document, Model } from 'mongoose';

export interface IProtocol {
  amount_c: number;
  amount_cx: number;
  amount_cy: number;
  amount_c_incentive: number;
  network: string;
  isDivest: boolean;
  dateOfEntry: Date;
  lastUpdated: Date;
}

export interface IProtocolDocument extends IProtocol, Document {
  setLastUpdated: (this: IProtocolDocument) => Promise<void>;
}

export interface IProtocolModel extends Model<IProtocolDocument> {
  paginate: (
    filter: any,
    options: any
  ) => {
    results: any;
    page: number;
    limit: number;
    totalPages: number;
    totalResults: any;
  };
}
