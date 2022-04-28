<template>
  <div class="reestr">
    <div class="reestr__table_filter">
      <div class="reestr__table_search">
        <base-search class="reestr__table_search_text" />
        <div class="reestr__table_search_wrapper">
          <company-select
            v-model="company"
            class="reestr__table_search_company"
          />
          <base-period-select
            v-model="period"
            class="reestr__table_search_period"
          />
          <b-btn
            @click="resetFilter"
            class="reestr__table_filter_btn"
            variant="danger"
            >Сбросить</b-btn
          >
        </div>
      </div>
      <div class="reestr__table_filter_btns">
        <b-btn class="reestr__table_filter_btn" pill variant="success"
          >На печать</b-btn
        >
        <b-btn class="reestr__table_filter_btn" pill variant="success"
          >Сформировать реестр</b-btn
        >
      </div>
    </div>

    <b-table
      hover
      striped
      class="reestr__table"
      selectable
      select-mode="multi"
      responsive
      :fields="headers"
      :items="demoData"
      ref="selectableTable"
      bordered
      @row-selected="onRowSelected"
      :per-page="perPage"
      :current-page="currentPage"
    >
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

      <template #cell(pre_amount_date)="{ value }">
        <b-form-datepicker
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

      <template #cell(full_amount_date)="{ value }">
        <b-form-datepicker
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

      <template #cell(comment)="{ value, index }">
        <b-button class="reestr__btn_badge" size="sm" variant="success" pill>
          <span>Комментировать</span>
          <b-badge
            :id="`badge-comment-${index}`"
            class="reestr__badge"
            variant="info"
            >{{ value.length }}</b-badge
          >
          <b-tooltip :target="`badge-comment-${index}`" triggers="hover"
            >Посмотреть все комментарии</b-tooltip
          >
        </b-button>
      </template>

      <template
        v-slot:[`cell(${name})`]="{ value, field, index }"
        v-for="name in nameFiles"
      >
        <b-button
          @click="openLastFile(value)"
          :key="name"
          class="reestr__btn_badge"
          size="sm"
          variant="primary"
        >
          <span>посмотреть</span>
          <b-badge
            :id="`badge-${name}-${index}`"
            @click.stop="showModal(field.label, value)"
            class="reestr__badge"
            variant="info"
            >{{ value.length }}
          </b-badge>
          <b-tooltip :target="`badge-${name}-${index}`" triggers="hover"
            >Посмотреть список всех файлов</b-tooltip
          >
        </b-button>
      </template>
    </b-table>

    <div class="reestr__table_functions">
      <b-pagination
        class="reestr__table_paginate"
        v-model="currentPage"
        :total-rows="totalLenght"
        :per-page="perPage"
        aria-controls="my-table"
      />
      <b-form-select v-model="perPage" :options="pageOptions" />
    </div>

    <files-modal
      :title="modalFiles.title"
      :files="modalFiles.files"
      v-model="modalFiles.state"
    />
  </div>
</template>

<script>
import Vue from "vue";
import { headers } from "./constants/tableHeaders";

import CompanySelect from "@/components/other/CompanySelect.vue";
import FilesModal from "@/components/modals/FilesModal.vue";

import demoData from "@/demo/ReestrDemo.json";
import { DealList } from "@/models/Deal";
import Period from "@/models/types";

import FileAction from "@/helpers/FileAction";

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
  components: { CompanySelect, FilesModal },
  data() {
    return {
      headers,
      demoData: new DealList(demoData).deals,
      selected: [],
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15, { value: 100, text: "Все" }],
      period: new Period({ to: null, from: null }),
      company: "",
      modalFiles: {
        state: false,
        files: [],
        title: "",
      },
      nameFiles,
    };
  },
  mounted() {
    console.log(demoData);
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
    showFiles(files) {
      console.log(files);
    },
    resetFilter() {
      (this.period = { to: null, from: null }), (this.company = "");
    },
    showModal(label, files) {
      this.modalFiles.state = true;
      this.modalFiles.files = files;
      this.modalFiles.title = label;
    },
    openLastFile(files) {
      FileAction.open(files[files.length - 1]);
    },
  },
  computed: {
    totalLenght() {
      return this.demoData.length;
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
        width 250px
      &_period
        margin-left 50px !important
  &__datepicker
    width 150px !important
  &__badge
    background white
    color black !important
    margin-left 10px
  &_btns
     padding 30px
  &__btn
    &_badge
      display:flex !important
      flexy(center,center)
</style>
