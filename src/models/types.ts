export type Alignments = "right" | "center" | "left";

export interface TableHeaders {
  key?: string;
  label?: string;
  sortable?: boolean;
  filterable?: boolean;
  align?: Alignments;
}

export interface PeriodConfig {
  date_to: Date | null;
  date_from: Date | null;
}

export default class Period implements PeriodConfig {
  date_to: Date | null;
  date_from: Date | null;
  constructor(args: PeriodConfig) {
    this.date_to = args.date_to;
    this.date_from = args.date_from;
  }
}

export interface IList<T> {
  size: number;
  res: T[];
}
