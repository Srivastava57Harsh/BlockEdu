export type Protocol = {
  amount_c: number;
  amount_cx: number;
  amount_cy: number;
  amount_c_incentive: number;
  network: string;
  isDivest: boolean;
};

export type ProtocolUpdate = {
  amount_c?: number;
  amount_cx?: number;
  amount_cy?: number;
  amount_c_incentive?: number;
  network?: string;
  isDivest?: boolean;
};

export type User = {
  addr: string;
  amount_A: number;
  amount_B: number;
  amount_c: number;
  amount_cx: number;
  amount_cy: number;
  network: string;
};

export type UserUpdate = {
  addr?: string;
  amount_A?: number;
  amount_B?: number;
  amount_c?: number;
  amount_cx?: number;
  amount_cy?: number;
  network?: string;
};

export type Liquidity = {
  addr: string;
  amount_A: number;
  amount_B: number;
  isRemoved: boolean;
};

export type LiquidityUpdate = {
  addr?: string;
  amount_A?: number;
  amount_B?: number;
  isRemoved?: boolean;
};

export type Swap = {
  addr: string;
  amount_A_In: number;
  amount_A_Out: number;
  amount_B_In: number;
  amount_B_Out: number;
};

export type SwapUpdate = {
  addr?: string;
  amount_A_In?: number;
  amount_A_Out?: number;
  amount_B_In?: number;
  amount_B_Out?: number;
};
