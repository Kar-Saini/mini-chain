import type Transaction from "../core/transaction";

export type INCOMING_MESSAGE = { type: "transaction"; payload: Transaction };
