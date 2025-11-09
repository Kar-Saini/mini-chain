import { Validator } from "./core/validator";
import { createRandomTransaction } from "./utils/helper";

const validator = Validator.getInstance();

function main() {
  const trxn = createRandomTransaction();
  validator.addTransactionToMemPool(trxn);
}
let i = 20;
while (i > 0) {
  main();
  i--;
}
