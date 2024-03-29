import FormatedDate from "@/helpers/DateFormat";

export interface FileConfig {
  approved: boolean;
  create: string;
  date_approved: Date;
  id: number;
  name: string;
  registry_id: number;
  source: string;
  type: string;
}

export interface CommentCreate {
  registry_id: number;
  messages: string;
}

export interface CommentConfig {
  created_at: string;
  id: number;
  messages: string;
  page: string;
  registry_id: number;
  updated_at: string;
}

export class Comment implements CommentConfig {
  created_at: string;
  id: number;
  messages: string;
  page: string;
  registry_id: number;
  updated_at: string;
  constructor(args: CommentConfig) {
    this.created_at = args.created_at;
    this.id = args.id;
    this.messages = args.messages;
    this.page = args.page;
    this.registry_id = args.registry_id;
    this.updated_at = args.updated_at;
  }
}

export class FileDeal implements FileConfig {
  approved: boolean;
  create: string;
  date_approved: Date;
  id: number;
  name: string;
  registry_id: number;
  source: string;
  type: string;
  constructor(args: FileConfig) {
    this.approved = args.approved;
    this.create = args.create;
    this.date_approved = args.date_approved;
    this.id = args.id;
    this.name = args.name;
    this.registry_id = args.registry_id;
    this.source = args.source;
    this.type = args.type;
  }

  public get date(): string {
    return FormatedDate.getDateRu(this.create);
  }

  public get path(): string {
    if (this.source == "logistic")
      return "https://logist.datrans.ru/" + this.name;
    else if (this.source == "perevoz")
      return "http://perevoz.datrans.ru/documents/" + this.name;
    else if (this.source == "reestr")
      return process.env.VUE_APP_API_BASE_PATH + "/" + this.name;
    return this.name;
  }
}

export interface DealConfig {
  comment: Array<Comment>;
  company_name: string;
  deal: number;
  files_act: Array<FileDeal>;
  files_check: Array<FileDeal>;
  files_invoice: Array<FileDeal>;
  files_order: Array<FileDeal>;
  files_ticket: Array<FileDeal>;
  files_trn: Array<FileDeal>;
  full_amount_date: string;
  id: number;
  own_comapny: string;
  pre_amount: any;
  pre_amount_date: string;
  summ_amount: any;
  state_client: number;
  status_color: string;
  status_id: number;
  status_order: number;
  status_text: string;
  account_number: string;
}

export default class Deal implements DealConfig {
  comment: Array<Comment>;
  company_name: string;
  deal: number;
  files_act: Array<FileDeal>;
  files_check: Array<FileDeal>;
  files_invoice: Array<FileDeal>;
  files_order: Array<FileDeal>;
  files_ticket: Array<FileDeal>;
  files_trn: Array<FileDeal>;
  full_amount_date: string;
  id: number;
  own_comapny: string;
  pre_amount: any;
  pre_amount_date: string;
  summ_amount: any;
  state_client: number;
  status_color: string;
  status_id: number;
  status_order: number;
  status_text: string;
  account_number: string;

  constructor(args: DealConfig) {
    this.comment = args.comment;
    this.company_name = args.company_name;
    this.deal = args.deal;
    this.files_act = args.files_act.map((file) => new FileDeal(file));
    this.files_check = args.files_check.map((file) => new FileDeal(file));
    this.files_invoice = args.files_invoice.map((file) => new FileDeal(file));
    this.files_order = args.files_order.map((file) => new FileDeal(file));
    this.files_ticket = args.files_ticket.map((file) => new FileDeal(file));
    this.files_trn = args.files_trn.map((file) => new FileDeal(file));
    this.full_amount_date = args.full_amount_date;
    this.id = args.id;
    this.own_comapny = args.own_comapny;
    this.pre_amount = args.pre_amount;
    this.pre_amount_date = args.pre_amount_date;
    this.summ_amount = args.summ_amount;
    this.state_client = args.state_client;
    this.status_color = args.status_color;
    this.status_id = args.status_id;
    this.status_order = args.status_order;
    this.status_text = args.status_text;
    this.account_number = args.account_number;
  }

  public get fullAmountDateFormat(): string {
    return FormatedDate.getDateRu(this.full_amount_date);
  }

  public get preAmountDateFormat(): string {
    return FormatedDate.getDateRu(this.pre_amount_date);
  }
}

export class DealList {
  deals: Array<Deal>;
  constructor(deals: Array<Deal>) {
    this.deals = deals.map((item) => new Deal(item));
  }
}

export interface ClientInvoiceConfig {
  invoice_id: number;
  deal_id: number;
  company_own: string;
  company: string;
  date_bill: any;
  route: string;
  sum_paid: number;
  inn: number;
  list_uslug: any;
  files_act: Array<FileDeal>;
  files_upd: Array<FileDeal>;
  files_invoice: Array<FileDeal>;
  files_account: Array<FileDeal>;
  files_other: Array<FileDeal>;
}

export class ClientInvoice implements ClientInvoiceConfig {
  invoice_id: number;
  deal_id: number;
  company_own: string;
  company: string;
  date_bill: any;
  route: string;
  sum_paid: number;
  inn: number;
  list_uslug: any;
  files_act: Array<FileDeal>;
  files_upd: Array<FileDeal>;
  files_invoice: Array<FileDeal>;
  files_account: Array<FileDeal>;
  files_other: Array<FileDeal>;

  constructor(args: ClientInvoiceConfig) {
    this.invoice_id = args.invoice_id;
    this.deal_id = args.deal_id;
    this.company_own = args.company_own;
    this.company = args.company;
    this.date_bill = args.date_bill;
    this.route = args.route;
    this.sum_paid = args.sum_paid;
    this.inn = args.inn;
    this.list_uslug = args.list_uslug;
    this.files_act = args.files_act.map((file) => new FileDeal(file));
    this.files_upd = args.files_upd.map((file) => new FileDeal(file));
    this.files_invoice = args.files_invoice.map((file) => new FileDeal(file));
    this.files_account = args.files_account.map((file) => new FileDeal(file));
    this.files_other = args.files_other.map((file) => new FileDeal(file));
  }
}
