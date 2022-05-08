<template>
  <div class="reestr">
    <div class="reestr__actions">
      <b-btn @click="modalCreate = true" class="reestr__btn" variant="primary">
        <b-icon size="sm" icon="plus-lg" aria-hidden="true" />
        Будущие платежи
      </b-btn>
    </div>

    <div class="reestr__table_filter">
      <div class="reestr__table_search">
        <base-search @search="searchText" class="reestr__table_search_text" />
        <div class="reestr__table_search_wrapper">
          <company-select
            v-model="search.company"
            class="reestr__table_search_company"
          />
          <base-period-select
            :disabled="loading"
            v-model="search.date"
            class="reestr__table_search_period"
          />
          <b-btn
            :disabled="loading"
            @click="resetFilter"
            class="reestr__table_filter_btn"
            variant="danger"
            >Сбросить</b-btn
          >
        </div>
      </div>
      <div class="reestr__table_filter_btns">
        <b-btn
          :disabled="loading"
          @click="print"
          class="reestr__table_filter_btn"
          pill
          variant="success"
          >На печать</b-btn
        >
        <b-btn
          :disabled="loading"
          @click="formReestr"
          class="reestr__table_filter_btn"
          pill
          variant="success"
          >Сформировать реестр</b-btn
        >
      </div>
    </div>

    <b-table
      id="reestr-table"
      hover
      striped
      class="reestr__table"
      selectable
      select-mode="multi"
      responsive
      :fields="headers"
      :items="items"
      :busy="loading"
      ref="selectableTable"
      bordered
      @row-selected="onRowSelected"
      :per-page="filters.limit"
      :tbody-tr-attr="rowColor"
    >
      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle mr-2"></b-spinner>
          <strong>Загрузка...</strong>
        </div>
      </template>

      <template #head(selected)="">
        <b-checkbox @input="toogleAll" />
      </template>

      <template #cell(selected)="{ rowSelected, selectRow, unselectRow }">
        <b-checkbox
          @input="(val) => (val ? selectRow() : unselectRow())"
          :checked="rowSelected"
        />
      </template>

      <template #cell(index)="{ index }">
        {{ index + 1 }}
      </template>

      <template #cell(pre_amount)="{ value, item }">
        <base-editable-text
          :value="value"
          @update="changePayment(item.id, 'p', $event)"
        />
      </template>

      <template #cell(summ_amount)="{ value, item }">
        <base-editable-text
          :value="value"
          @update="changePayment(item.id, 'f', $event)"
        />
      </template>

      <template #cell(pre_amount_date)="{ item, value }">
        <b-form-datepicker
          @input="changeDate(item.id, value, 'pre_date')"
          class="reestr__datepicker"
          :date-format-options="{
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          }"
          locale="ru"
          :value="value"
          placeholder=""
          :disabled="!value"
        />
      </template>

      <template #cell(full_amount_date)="{ item, value }">
        <b-form-datepicker
          @input="changeDate(item.id, value, 'full_date')"
          class="reestr__datepicker"
          :date-format-options="{
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          }"
          locale="ru"
          :value="value"
          placeholder=""
          :disabled="!value"
        />
      </template>

      <template #cell(comment)="{ value }">
        <b-button
          class="reestr__btn_badge"
          size="sm"
          variant="outline-dark"
          pill
        >
          <span>Комментировать</span>
          <b-badge class="reestr__badge">{{ value.length }}</b-badge>
        </b-button>
      </template>

      <template
        v-slot:[`cell(${name})`]="{ value, field }"
        v-for="name in nameFiles"
      >
        <b-button
          @click="openLastFile(value)"
          :key="name"
          class="reestr__btn_badge"
          size="sm"
          variant="outline-dark"
        >
          <span>посмотреть</span>
          <b-badge
            @click.stop="showModal(field.label, value)"
            class="reestr__badge"
            variant="info"
            >{{ value.length }}
          </b-badge>
        </b-button>
      </template>

      <template #cell(status)="{ item }">
        <b-dropdown size="sm" class="m-2">
          <b-dropdown-item-button
            @click="setStatusPayment(item.id, statusPayment.id)"
            v-for="statusPayment in statusPaymentList"
            :key="statusPayment.id"
          >
            <div class="reestr__table_statusPayment">
              <div
                :style="{ background: statusPayment.color }"
                class="reestr__table_statusPayment_badge"
              />
              {{ statusPayment.text }}
            </div>
          </b-dropdown-item-button>
        </b-dropdown>
      </template>
    </b-table>

    <div class="reestr__table_functions">
      <b-pagination
        class="reestr__table_paginate"
        v-model="page"
        :total-rows="totalItems"
        :per-page="filters.limit"
        aria-controls="my-table"
        @change="paginate({ itemsPerPage: filters.limit, page })"
      />
      <b-form-select
        @change="paginate({ itemsPerPage: filters.limit, page })"
        v-model="filters.limit"
        :options="pageOptions"
      />
    </div>

    <files-modal
      :title="modalFiles.title"
      :files="modalFiles.files"
      v-model="modalFiles.state"
    />
    <create-deal-modal v-model="modalCreate" />
  </div>
</template>

<script>
import Vue from "vue";
import { headers } from "./constants/tableHeaders";

import CompanySelect from "@/components/other/CompanySelect.vue";
import FilesModal from "@/components/modals/FilesModal.vue";
import CreateDealModal from "@/components/modals/CreateDealModal.vue";

import Period from "@/models/types";

import FileAction from "@/helpers/FileAction";
import PrintActions from "@/helpers/PrintActions";

import ReestrApi from "@/services/api/ReestrApi";
import PaginateMixin from "@/mixins/PaginateMixin";

import FormatedDate from "@/helpers/DateFormat";

const nameFiles = [
  "files_act",
  "files_invoice",
  "files_check",
  "files_ticket",
  "files_trn",
  "files_other",
  "files_order",
];

export default Vue.extend({
  name: "PageReestr",
  components: { CompanySelect, FilesModal, CreateDealModal },
  mixins: [PaginateMixin],
  data() {
    return {
      loading: false,
      headers,
      items: [],
      selected: [],
      pageOptions: [5, 10, 15, 50, 100],
      modalFiles: {
        state: false,
        files: [],
        title: "",
      },
      modalCreate: false,
      nameFiles,
      search: {
        text: null,
        date: new Period({ date_to: null, date_from: null }),
        company: null,
      },
      statusPaymentList: [],
    };
  },

  methods: {
    onRowSelected(items) {
      this.selected = items;
    },
    selectAllRows() {
      this.$refs.selectableTable.selectAllRows();
    },
    clearSelected() {
      this.$refs.selectableTable.clearSelected();
    },
    toogleAll(state) {
      if (state) this.selectAllRows();
      else this.clearSelected();
    },
    resetFilter() {
      this.makeNotification("Действие", "Фильтр сброшен", "success");
      this.search = {
        text: null,
        date: new Period({ date_to: null, date_from: null }),
        company: null,
      };
    },
    showModal(label, files) {
      this.modalFiles.state = true;
      this.modalFiles.files = files;
      this.modalFiles.title = label;
    },
    openLastFile(files) {
      FileAction.open(files[files.length - 1]);
    },
    print() {
      let thead = [
        "index",
        "deal",
        "own_comapny",
        "company_name",
        "pre_amount",
        "summ_amount",
        "preAmountDateFormat",
        "fullAmountDateFormat",
      ];

      PrintActions.printTable({
        headers: [
          ...headers.filter((item) => thead.includes(item.key)),
          { key: "preAmountDateFormat", label: "Дата предоплаты" },
          { key: "fullAmountDateFormat", label: "Дата полной оплаты" },
        ],
        data: this.items.map((item, index) => {
          let obj = {};
          thead.forEach((head) => {
            if (head == "index") {
              obj.index = index + 1;
              this.indexRow++;
            } else obj[head] = item[head];
          });
          return obj;
        }),
      });
    },
    formReestr() {
      if (this.selected.length > 0) {
        ReestrApi.sendToPayment(this.selected.map((item) => item.id)).then(
          this.makeNotification("Действие", "Реестр сформирован", "success")
        );
      } else {
        this.makeNotification(
          "Информация",
          "Выберите хотя бы одну строку",
          "danger"
        );
      }
    },
    async fetch() {
      this.loading = true;
      const search = { ...this.search, ...this.search.date };
      delete search.date;

      const params = { ...search, ...this.filters };

      ReestrApi.getList(params)
        .then((res) => {
          this.totalItems = res.size;
          this.items = res.res;
          this.loading = false;
        })
        .catch(console.error);
    },
    fetchStatusPayment() {
      ReestrApi.getStatusPaymentList()
        .then((res) => {
          this.statusPaymentList = res;
        })
        .catch(console.error);
    },
    searchText(text) {
      this.search.text = text;
    },
    changeDate(id, date, key) {
      ReestrApi.changeDatePayment({ id, [key]: date })
        .then(() => {
          this.fetch();
          this.makeNotification("Действие", "Дата оплаты изменена", "success");
        })
        .catch(() => {
          this.makeNotification(
            "Ошибка",
            "Не удалось изменить дату оплаты",
            "danger"
          );
        });
    },
    rowColor(item, type) {
      if (!item || type !== "row") return;
      return { style: `background:${item.status_color}` };
    },
    setStatusPayment(id, status_id) {
      ReestrApi.setStatusPayment({ id, status_id })
        .then(() => {
          this.fetch();
          this.makeNotification("Действие", "Статус оплаты изменён", "success");
        })
        .catch(() => {
          this.makeNotification(
            "Ошибка",
            "Не удалось изменить статус оплаты",
            "danger"
          );
        });
    },
    changePayment(id, type, sum) {
      ReestrApi.changePayment({ id, type, sum })
        .then(() => {
          this.fetch();
          this.makeNotification("Действие", "Сумма оплаты изменена", "success");
        })
        .catch(() => {
          this.makeNotification(
            "Ошибка",
            "Не удалось изменить сумму платежа",
            "danger"
          );
        });
    },
  },
  async mounted() {
    this.fetch();
    this.fetchStatusPayment();
  },

  watch: {
    filters() {
      this.fetch();
    },
    search: {
      handler() {
        this.fetch();
      },
      deep: true,
    },
  },
});
</script>

<style lang="stylus">
@require '~@/assets/stylus/vars/variables';
@require '~@/assets/stylus/mixins/mixins';
.reestr
  container(true)
  flexy(center,center,nowrap,column)
  max-width 95% !important
  &__actions
    width 100%
    margin 20px 0px
    flexy(flex-start,flex-start,wrap)
  &__btn
    flexy(center,center)
  &__table
    width 100%
    &_functions
      flexy(center,center)
    &_paginate
      margin 0px
      margin-right 20px
    &_filter
      width 100%
      flexy(space-between,flex-start,wrap)
      margin 30px 0px
      &_btns
        margin-top 30px
      &_btn
        margin 0px 10px
    &_search
      flexy(flex-start,center,wrap)
      &_wrapper
        flexy(flex-start,center,wrap)
      &_text
        width 300px !important
        margin-right 30px
      &_company
        width 250px !important
      &_period
        margin-left 50px !important
    &_statusPayment
      flexy(flex-start,center)
      &_badge
        margin-right 10px
        width 50px
        height 25px
  &__datepicker
    width 150px !important
  &__badge
    background white !important
    color black !important
    margin-left 10px
  &_btns
     padding 30px
  &__btn
    &_badge
      display:flex !important
      flexy(center,center)
</style>
