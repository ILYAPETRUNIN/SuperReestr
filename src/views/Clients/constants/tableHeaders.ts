import { TableHeaders } from "@/models/types";

export const headers: TableHeaders[] = [
  { key: "selected", label: "" },
  { key: "index", label: "" },
  { key: "id", label: "#" },
  { key: "deal", label: "Номер сделки" },
  { key: "account_number", label: "Номер счёта" },
  { key: "company_name", label: "Компания перевозчика" },
  { key: "own_comapny", label: "Наша компания" },
  { key: "pre_amount", label: "Сумма предоплаты" },
  { key: "summ_amount", label: "Сумма полной оплаты" },
  { key: "pre_amount_date", label: "Дата предоплаты" },
  { key: "full_amount_date", label: "Дата полной оплаты" },
  { key: "comment", label: "" },
  { key: "files_act", label: "Заявка" },
  { key: "files_invoice", label: "Счёт" },
  { key: "files_check", label: "Акт УПД" },
  { key: "files_ticket", label: "СЧФ" },
  { key: "files_trn", label: "ТРН(2 стороны)" },
  { key: "files_other", label: "Иные документы" },
  { key: "files_order", label: "Скан квитка" },
  { key: "status", label: "" },
];
