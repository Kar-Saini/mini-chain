import { useEffect, useState } from "react";
import type { Block, INCOMING_MESSAGE } from "./types";

const BlockchainViewer = () => {
  const [chain, setChain] = useState<Block[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    if (socket.readyState == 1) {
      setSocket(socket);
    }

    socket.onmessage = ({ data }) => {
      const parsedMessage: INCOMING_MESSAGE = JSON.parse(data);
      const { payload, type } = parsedMessage;
      switch (type) {
        case "blockchain":
          setChain(payload);
          break;
        case "block-added":
          console.log("Block added event received on ws client");
          setChain((p) => [...p, payload]);
          break;
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        🪙 Mini Blockchain
      </h1>

      <div className=" grid grid-cols-3 gap-4">
        {chain.map((block) => (
          <div
            key={block.height}
            className="bg-white rounded-md shadow-md p-4 border border-gray-200"
          >
            <div className="flex justify-between items-center mb-1">
              <h2 className="text-md font-extrabold text-blue-600">
                Block #{block.height}
              </h2>
            </div>

            <div className="text-xs text-gray-700 mb-2">
              <p>
                <strong>Nonce:</strong> {block.nonce}
              </p>
              <p>
                <strong>Hash:</strong> {block.current_block_hash}
              </p>
              <p>
                <strong>Prev Hash:</strong> {block.prev_block_hash}
              </p>
              <p> {new Date(block.timestamp).toISOString()}</p>
            </div>

            <div>
              <h3 className=" font-bold mb-1">Transactions:</h3>
              {block.transactions.map((t, i) => (
                <div
                  className="flex justify-between text-xs text-gray-800 bg-gray-200 p-1 m-1 w-full"
                  key={t.from}
                >
                  <p key={i} className="">
                    {t.from.slice(0, 20)}... → {t.to.slice(0, 20)}...
                  </p>
                  <p>Amount : {t.amount}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlockchainViewer;
