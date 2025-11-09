import { SHA256 } from "crypto-js";
import Transaction from "./transaction";

export default class Block {
  public prev_block_hash: string;
  public timestamp: number;
  public current_block_hash: string = "";
  public height: number;
  public nonce: number;
  public transactions: Transaction[];
  constructor(prev_block_hash: string, height: number) {
    this.prev_block_hash = prev_block_hash;
    this.timestamp = Date.now();
    this.nonce = 0;
    this.height = height;
    this.transactions = [];
  }

  toString(): string {
    return `Block - 
    Timestamp           : ${this.timestamp}, 
    Last Block Hash     : ${this.prev_block_hash}, 
    Current Block Hash  : ${this.current_block_hash}, 
    Height              : ${this.height}, 
    Nonce               : ${this.nonce}, 
    Transaction         : ${this.transactions.map((t) => JSON.stringify(t))}, 
    `;
  }

  static genesis() {
    const genesisBlock = new this("0", 0);
    const genesisTx = new Transaction("GENESIS", "GENESIS", 0, "GENESIS_SIG");
    genesisBlock.transactions.push(genesisTx);
    genesisBlock.current_block_hash = SHA256(
      JSON.stringify(genesisBlock)
    ).toString();
    return genesisBlock;
  }
}
