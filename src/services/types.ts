export interface PaginateConfig {
  limit?: number;
  offset?: number;
}

export interface ReestrGetConfig extends PaginateConfig {
  text?: string;
  date_from?: string;
  date_to?: string;
}

export interface ChangeDatePaymentConfig {
  id: number;
  pre_date?: string;
  full_date?: string;
}

export interface SetPaymentConfig {
  id: number;
  status_id: number;
}
