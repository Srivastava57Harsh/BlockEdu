import { ISwapDocument } from './swap.types';

export async function setLastUpdated(this: ISwapDocument): Promise<void> {
  const now = new Date();
  if (!this.lastUpdated || this.lastUpdated < now) {
    this.lastUpdated = now;
    await this.save();
  }
}
