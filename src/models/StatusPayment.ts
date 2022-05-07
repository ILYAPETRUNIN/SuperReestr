export interface StatusPaymentConfig {
  id: number;
  color: string;
  text: string;
  order: number;
}

export default class StatusPayment {
  id: number;
  color: string;
  text: string;
  order: number;
  constructor(args: StatusPaymentConfig) {
    this.id = args.id;
    this.color = args.color;
    this.text = args.text;
    this.order = args.order;
  }
}
