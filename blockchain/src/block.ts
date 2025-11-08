import { SHA256 } from "crypto-js";
import Transaction from "./transaction";

export default class Block {
  public prev_block_hash: string;
  public timestamp: number;
  public current_block_hash: string = "";
  public height: number;
  public nonce: number;
  public transaction: Transaction;
  public PREFIX: string = "000";
  constructor(
    prev_block_hash: string,
    height: number,
    transaction: Transaction
  ) {
    this.prev_block_hash = prev_block_hash;
    this.timestamp = Date.now();
    this.nonce = 0;
    this.height = height;
    this.transaction = transaction;
    this.calculateHash();
  }

  toString(): string {
    return `Block - 
    Timestamp           : ${this.timestamp}, 
    Last Block Hash     : ${this.prev_block_hash}, 
    Current Block Hash  : ${this.current_block_hash}, 
    Height              : ${this.height}, 
    Nonce               : ${this.nonce}, 
    `;
  }
  calculateHash() {
    let nonce = this.nonce;
    while (1) {
      let hash = SHA256(
        this.prev_block_hash +
          this.timestamp +
          JSON.stringify(this.transaction) +
          nonce +
          this.height
      ).toString();
      if (hash.startsWith(this.PREFIX)) {
        this.nonce = nonce;
        this.current_block_hash = hash;
        return;
      }
      nonce++;
    }
  }

  static genesis() {
    const genesisTx = new Transaction("GENESIS", "GENESIS", 0, "");
    return new this("", 0, genesisTx);
  }
}
