import type Transaction from "../transaction";

export type INCOMING_MESSAGE = { type: "transaction"; payload: Transaction };
