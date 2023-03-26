import { ILiquidityDocument } from './liquidity.types';

export async function setLastUpdated(this: ILiquidityDocument): Promise<void> {
  const now = new Date();
  if (!this.lastUpdated || this.lastUpdated < now) {
    this.lastUpdated = now;
    await this.save();
  }
}
