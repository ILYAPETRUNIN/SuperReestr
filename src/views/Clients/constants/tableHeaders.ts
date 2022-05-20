import { TableHeaders } from "@/models/types";

export const headers: TableHeaders[] = [
  { key: "selected", label: "" },
  { key: "index", label: "" },
  { key: "id", label: "#" },
  { key: "date_payment", label: "Дата выставления счета" },
  { key: "deal", label: "ИД сделки" },
  { key: "dir", label: "Направление" },
  { key: "own_comapny", label: "Наша компания" },
  { key: "inn", label: "ИНН" },
  { key: "sum", label: "Сумма счёта" },
  { key: "services", label: "Услуги" },
  { key: "files_invoice", label: "Счёт" },
  { key: "files_check", label: "Акт" },
  { key: "files_ticket", label: "СЧФ" },
  { key: "files_udp", label: "УДП" },
  { key: "files_other", label: "Иные документы" },
  { key: "sel_1c", label: "Выставлен в 1С" },
  { key: "close", label: "Закрыт" },
];
