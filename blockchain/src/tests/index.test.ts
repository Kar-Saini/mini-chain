import { test } from "bun:test";
import { ec as EC } from "elliptic";
import Transaction from "../transaction";
import Blockchain from "../blockchain";
import { SHA256 } from "crypto-js";
import WebSocket from "ws";
const ec = new EC("secp256k1");

function createRandomTransaction() {
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

test("Block", (done) => {
  const ws = new WebSocket("ws://localhost:8080");

  ws.onopen = () => {
    for (let i = 0; i < 50; i++) {
      ws.send(
        JSON.stringify({
          type: "transaction",
          payload: createRandomTransaction(),
        })
      );
    }
  };

  setTimeout(() => {
    console.log(Blockchain.getInstance().chain);
    done();
  }, 3000); // 3 seconds delay
});
