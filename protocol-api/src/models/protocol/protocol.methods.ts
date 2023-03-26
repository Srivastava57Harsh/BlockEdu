import { IProtocolDocument } from './protocol.types';

export async function setLastUpdated(this: IProtocolDocument): Promise<void> {
  const now = new Date();
  if (!this.lastUpdated || this.lastUpdated < now) {
    this.lastUpdated = now;
    await this.save();
  }
}
