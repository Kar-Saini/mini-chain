export default class Transaction {
  public from: string;
  public to: string;
  public signature: string;
  public timestamp: number;
  public amount: number;

  constructor(from: string, to: string, amount: number, signature: string) {
    this.from = from;
    this.to = to;
    this.timestamp = Date.now();
    this.amount = amount;
    this.signature = signature;
  }
}
