import { SHA256 } from "crypto-js";
import { ec as EC } from "elliptic";
import Transaction from "../core/transaction";

export const ec = new EC("secp256k1");

export function createRandomTransaction() {
  const fromKeyPair = ec.genKeyPair();
  const toKeyPair = ec.genKeyPair();

  const fromPubKey = fromKeyPair.getPublic("hex");
  const toPubKey = toKeyPair.getPublic("hex");

  const amount = Math.ceil(Math.random() * 10 + 1);
  const message = `${fromPubKey}${toPubKey}${amount}`;
  const hashedMessage = SHA256(message).toString();
  const signature = fromKeyPair.sign(hashedMessage).toDER("hex");

  const trxn = new Transaction(fromPubKey, toPubKey, amount, signature);
  return trxn;
}
