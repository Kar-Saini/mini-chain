import Block from "./block";

export default class Blockchain {
  public chain: Block[];
  static instance: Blockchain;
  public PREFIX: string = "000";

  private constructor() {
    this.chain = [Block.genesis()];
  }
  static getInstance() {
    if (!this.instance) {
      this.instance = new Blockchain();
    }
    return this.instance;
  }
}
