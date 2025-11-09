export type INCOMING_MESSAGE =
  | { type: "blockchain"; payload: Block[] }
  | { type: "block-added"; payload: Block };

export interface Transaction {
  from: string;
  to: string;
  amount: number;
  timestamp: number;
}

export interface Block {
  height: number;
  prev_block_hash: string;
  current_block_hash: string;
  timestamp: number;
  nonce: number;
  transactions: Transaction[];
}
