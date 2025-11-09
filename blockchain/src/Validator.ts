import { SHA256 } from "crypto-js";
import Block from "./block";
import Blockchain from "./blockchain";
import type Transaction from "./transaction";
import { ec as EC } from "elliptic";

const ec = new EC("secp256k1");

export class Validator {
  mempool: Transaction[];
  verifiedTransaction: Transaction[];

  constructor() {
    this.mempool = [];
    this.verifiedTransaction = [];
  }
  addTransactionToMemPool(trxn: Transaction) {
    this.mempool.push(trxn);
    this.isTransactionSigantureValid(trxn);
  }

  isTransactionSigantureValid(trxn: Transaction) {
    if (!trxn) return;
    const { amount, from, signature, to } = trxn;
    const pubKey = ec.keyFromPublic(from, "hex");
    const msgHash = SHA256(`${from}${to}${amount}`).toString();
    const isSignatureValid = pubKey.verify(msgHash, signature);
    if (isSignatureValid) {
      this.verifiedTransaction.push(trxn);
      console.log("Pushed to verified");
    }
    this.mempool = this.mempool.filter((trxn) => trxn.signature !== signature);
    this.checkVerifiedTransactionLength();
  }
  checkVerifiedTransactionLength() {
    if (this.verifiedTransaction.length == 10) {
      console.log("Initiating block");
      this.createBlock();
    }
  }

  createBlock() {
    const lastBlock =
      Blockchain.getInstance().chain[Blockchain.getInstance().chain.length - 1];
    if (!lastBlock) return;
    const block = new Block(
      lastBlock?.current_block_hash,
      lastBlock?.height + 1
    );
    this.verifiedTransaction.map((t) => block.transactions.push(t));
    this.verifiedTransaction = [];

    let nonce = 0;
    while (true) {
      const blockString = JSON.stringify({
        prev_hash: block.prev_block_hash,
        transactions: block.transactions,
        timestamp: block.timestamp,
        height: block.height,
        nonce,
      });
      const hash = SHA256(blockString).toString();

      if (hash.startsWith(Blockchain.getInstance().PREFIX)) {
        console.log("Found - " + nonce);

        block.nonce = nonce;
        block.current_block_hash = hash;
        Blockchain.getInstance().chain.push(block);
        break;
      }
      console.log(nonce);
      nonce++;
    }
    Blockchain.getInstance().chain.push(block);
    console.log("Block");
    console.log(block);
  }

  dumpBlocks() {}
}
