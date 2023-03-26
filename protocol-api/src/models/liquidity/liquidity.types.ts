import { Document, Model } from 'mongoose';

export interface ILiquidity {
  addr: string;
  amount_A: number;
  amount_B: number;
  isRemoved: boolean;
  dateOfEntry: Date;
  lastUpdated: Date;
}

export interface ILiquidityDocument extends ILiquidity, Document {
  setLastUpdated: (this: ILiquidityDocument) => Promise<void>;
}

export interface ILiquidityModel extends Model<ILiquidityDocument> {
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
