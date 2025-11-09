import { WebSocketServer } from "ws";
import { Validator } from "./core/validator";
import type { INCOMING_MESSAGE } from "./utils/types";
import Blockchain from "./core/blockchain";
import { createRandomTransaction } from "./utils/helper";

export const wss = new WebSocketServer(
  {
    port: 8080,
  },
  () => console.log("WSS started")
);

const validator = Validator.getInstance(); // ✅ singleton instance
wss.on("connection", (ws: WebSocket) => {
  console.log("User connected");
  console.log("Attaching listener...");
  validator.on("block-added", (block) => {
    console.log("Block added event received on ws server");
    ws.send(JSON.stringify({ type: "block-added", payload: block }));
  });
  ws.send(
    JSON.stringify({
      type: "blockchain",
      payload: Blockchain.getInstance().chain,
    })
  );
  ws.onmessage = (message) => {
    const { payload, type }: INCOMING_MESSAGE = JSON.parse(message.data);
    switch (type) {
      case "transaction":
        validator.addTransactionToMemPool(payload);
        console.log(payload);
        break;
    }
  };
});

setInterval(() => {
  const tx = createRandomTransaction();
  validator.addTransactionToMemPool(tx);
}, 500);
