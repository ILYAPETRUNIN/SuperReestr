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

enum TypePayment {
  "p",
  "f",
}

export interface ChangePaymentConfig {
  id: number;
  type: TypePayment;
  sum: number;
}

export interface ReestrOneC {
  id: number;
}

export interface ReestrDefect {
  id: number;
}

export interface ReestrUploadAt {
  id: number;
  real_upload_at?: string;
}

export interface ReestrClose {
  id: number;
}
