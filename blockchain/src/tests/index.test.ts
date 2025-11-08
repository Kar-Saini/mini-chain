import Block from "../block";
import Transaction from "../transaction";

test("Block", () => {
  const genesis = Block.genesis();
  for (let i = 0; i < 5; i++) {
    const trx = new Transaction(
      Math.random().toString(),
      Math.random().toString(),
      Math.random(),
      Math.random().toString()
    );
    const newBlock = new Block(Math.random().toString(), Math.random(), trx);
    console.log(newBlock.toString);
  }
});
