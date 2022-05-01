export type Alignments = "right" | "center" | "left";

export interface TableHeaders {
  key?: string;
  label?: string;
  sortable?: boolean;
  filterable?: boolean;
  align?: Alignments;
}

export interface PeriodConfig {
  to: Date | null;
  from: Date | null;
}

export default class Period implements PeriodConfig {
  to: Date | null;
  from: Date | null;
  constructor(args: PeriodConfig) {
    this.to = args.to;
    this.from = args.from;
  }
}

export interface IList<T> {
  size: number;
  res: T[];
}
