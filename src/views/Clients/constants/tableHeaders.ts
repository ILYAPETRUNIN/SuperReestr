import { TableHeaders } from "@/models/types";

export const headers: TableHeaders[] = [
  { key: "selected", label: "" },
  { key: "index", label: "#" },
  { key: "invoice_id", label: "ИД счета" },
  { key: "date_bill", label: "Дата выставления счета" },
  { key: "deal_id", label: "ИД сделки" },
  { key: "route", label: "Направление" },
  { key: "company_own", label: "Наша компания" },
  { key: "inn", label: "ИНН" },
  { key: "sum_paid", label: "Сумма счёта" },
  { key: "form_of_payment", label: "Форма оплаты" },
  { key: "list_uslug", label: "Услуги" },
  { key: "files_invoice", label: "Счёт" },
  { key: "files_act", label: "Акт" },
  { key: "files_account", label: "СЧФ" },
  { key: "files_upd", label: "УДП" },
  { key: "files_other", label: "Иные документы" },
  { key: "one_c", label: "Выставлен в 1С" },
  { key: "close", label: "Закрыт" },
];
