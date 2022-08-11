import FormatedDate from "@/helpers/DateFormat";

export interface FileConfig {
  name: string;
  path: string;
  id: number;
  type: string;
  create: string;
}

export class FileClient implements FileConfig {
  id: number;
  name: string;
  path: string;
  type: string;
  create: string;
  constructor(args: FileConfig) {
    this.id = args.id;
    this.name = args.name;
    this.path = process.env.VUE_APP_API_BASE_PATH + "/" + args.path;
    this.type = args.type;
    this.create = args.create;
  }

  public get date(): string {
    return FormatedDate.getDateRu(this.create) + " - " + this.name;
  }
}

export interface ClientInvoiceConfig {
  invoice_id: number;
  deal_id: number;
  company_own: any;
  company: any;
  date_bill: any;
  sum_paid: string;
  form_of_payment: string;
  inn: number;
  currency: string;
  list_uslug: Array<string>;
  files_act: Array<FileClient>;
  files_upd: Array<FileClient>;
  files_invoice: Array<FileClient>;
  files_account: Array<FileClient>;
  files_other: Array<FileClient>;
  state_invoice: string;
  one_c: boolean;
  close: boolean;
}

export default class ClientInvoice implements ClientInvoiceConfig {
  invoice_id: number;
  deal_id: number;
  company_own: any;
  company: any;
  date_bill: any;
  sum_paid: string;
  form_of_payment: string;
  inn: number;
  currency: string;
  list_uslug: Array<string>;
  files_act: Array<FileClient>;
  files_upd: Array<FileClient>;
  files_invoice: Array<FileClient>;
  files_account: Array<FileClient>;
  files_other: Array<FileClient>;
  state_invoice: string;
  one_c: boolean;
  close: boolean;

  constructor(args: ClientInvoiceConfig) {
    this.invoice_id = args.invoice_id;
    this.deal_id = args.deal_id;
    this.company_own = args.company_own;
    this.company = args.company;
    this.date_bill = FormatedDate.getDateRu(args.date_bill);
    this.sum_paid = args.currency.replace("#", args.sum_paid);
    this.form_of_payment = args.form_of_payment;
    this.inn = args.inn;
    this.currency = args.currency;
    this.list_uslug = args.list_uslug;
    this.files_act = args.files_act.map((file) => new FileClient(file));
    this.files_upd = args.files_upd.map((file) => new FileClient(file));
    this.files_invoice = args.files_invoice.map((file) => new FileClient(file));
    this.files_account = args.files_account.map((file) => new FileClient(file));
    this.files_other = args.files_other.map((file) => new FileClient(file));
    this.state_invoice = args.state_invoice;
    this.one_c = args.one_c;
    this.close = args.close;
  }

  public get date(): string {
    return FormatedDate.getDateRu(this.date_bill);
  }
}
