export const schema = [
  {
    component: "company-select",
    model: "company",
  },
  {
    component: "base-period-select",
    model: "date",
  },
];

export const model = {
  date: { date_to: null, date_from: null },
  company: null,
};
