import Vue from "vue";
// import Cookies from "vue-cookies";
import BasePeriodSelect from "./base/BasePeriodSelect.vue";
import BaseSearch from "./base/BaseSearch.vue";
import BaseEditableText from "./base/BaseEditableText.vue";
import BaseViewOnlyText from "./base/BaseViewOnlyText.vue";
import TablePaginate from "./base/table/TablePaginate.vue";
import TableFilter from "./base/table/TableFilter.vue";

Vue.use(Cookies);
const page_view = Vue.$cookies.get("page_view");

if (page_view) {
  Vue.component("base-editable-text", BaseEditableText);
} else {
  Vue.component("base-editable-text", BaseViewOnlyText);
}

Vue.component("base-period-select", BasePeriodSelect);
Vue.component("base-search", BaseSearch);
Vue.component("table-paginate", TablePaginate);
Vue.component("table-filter", TableFilter);

import CompanySelect from "./other/CompanySelect.vue";
import Cookies from "vue-cookies";

Vue.component("company-select", CompanySelect);
