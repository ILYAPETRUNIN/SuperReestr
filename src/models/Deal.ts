export interface FileConfig {
  approved: boolean;
  create: string;
  date_approved: any;
  id: number;
  name: string;
  registry_id: number;
  source: string;
  type: string;
}

export interface DealConfig {
  comment: Array<any>;
  company_name: string;
  deal: number;
  files_act: Array<FileConfig>;
  files_check: Array<FileConfig>;
  files_invoice: Array<FileConfig>;
  files_order: Array<FileConfig>;
  files_ticket: Array<FileConfig>;
  files_trn: Array<FileConfig>;
  full_amount_date: any;
  id: number;
  own_comapny: string;
  pre_amount: any;
  pre_amount_date: Date | null;
  summ_amount: any;
}

export default class Deal implements DealConfig {
  comment: Array<any>;
  company_name: string;
  deal: number;
  files_act: Array<FileConfig>;
  files_check: Array<FileConfig>;
  files_invoice: Array<FileConfig>;
  files_order: Array<FileConfig>;
  files_ticket: Array<FileConfig>;
  files_trn: Array<FileConfig>;
  full_amount_date: any;
  id: number;
  own_comapny: string;
  pre_amount: any;
  pre_amount_date: Date | null;
  summ_amount: any;
  constructor(args: DealConfig) {
    this.comment = args.comment;
    this.company_name = args.company_name;
    this.deal = args.deal;
    this.files_act = args.files_act;
    this.files_check = args.files_check;
    this.files_invoice = args.files_invoice;
    this.files_order = args.files_order;
    this.files_ticket = args.files_ticket;
    this.files_trn = args.files_trn;
    this.full_amount_date = args.full_amount_date;
    this.id = args.id;
    this.own_comapny = args.own_comapny;
    this.pre_amount = args.pre_amount;
    this.pre_amount_date = args.pre_amount_date;
    this.summ_amount = args.summ_amount;
  }
}

export class DealList {
  deals: Array<Deal>;
  constructor(deals: Array<Deal>) {
    this.deals = deals;
  }
}
