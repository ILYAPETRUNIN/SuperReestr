export type Alignments = "right" | "center" | "left";

export interface TableHeaders {
  key?: string;
  label?: string;
  sortable?: boolean;
  filterable?: boolean;
  align?: Alignments;
}
