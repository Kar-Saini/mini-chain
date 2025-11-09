import { test } from "bun:test";
import Blockchain from "../core/blockchain";
import WebSocket from "ws";
import { createRandomTransaction } from "../utils/helper";

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
