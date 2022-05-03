export interface CompanyConfig {
  OwnCompany?: string;
  id: any;
}

export default class Company {
  OwnCompany?: string;
  id: any;
  constructor(args: CompanyConfig) {
    this.OwnCompany = args.OwnCompany;
    this.id = args.id;
  }
}
