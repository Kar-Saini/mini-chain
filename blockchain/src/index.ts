import { WebSocketServer } from "ws";
import { Validator } from "./Validator";
import type { INCOMING_MESSAGE } from "./types";
import Blockchain from "./blockchain";

const wss = new WebSocketServer(
  {
    port: 8080,
  },
  () => console.log("WSS started")
);

wss.on("connection", (ws: WebSocket) => {
  console.log("User connected");
  const validator = new Validator();
  ws.onmessage = (message) => {
    const { payload, type }: INCOMING_MESSAGE = JSON.parse(message.data);
    switch (type) {
      case "transaction":
        validator.addTransactionToMemPool(payload);
        console.log(payload);
        break;
    }
  };
  console.log(Blockchain.getInstance().chain);
});
