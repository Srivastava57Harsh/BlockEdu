import { Document, Model } from 'mongoose';

export interface IUser {
  addr: string;
  amount_A: number;
  amount_B: number;
  amount_c: number;
  amount_cx: number;
  amount_cy: number;
  dateOfEntry: Date;
  lastUpdated: Date;
}

export interface IUserDocument extends IUser, Document {
  setLastUpdated: (this: IUserDocument) => Promise<void>;
}

export interface IUserModel extends Model<IUserDocument> {
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
