import Vue from "vue";
import BasePeriodSelect from "./base/BasePeriodSelect.vue";
import BaseSearch from "./base/BaseSearch.vue";
import BaseEditableText from "./base/BaseEditableText.vue";
import TablePaginate from "./base/table/TablePaginate.vue";
import TableFilter from "./base/table/TableFilter.vue";

Vue.component("base-period-select", BasePeriodSelect);
Vue.component("base-search", BaseSearch);
Vue.component("base-editable-text", BaseEditableText);
Vue.component("table-paginate", TablePaginate);
Vue.component("table-filter", TableFilter);

import CompanySelect from "./other/CompanySelect.vue";

Vue.component("company-select", CompanySelect);
