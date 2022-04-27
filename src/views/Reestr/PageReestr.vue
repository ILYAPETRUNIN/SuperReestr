<template>
  <div class="reestr">
    <div class="reestr__table_filter">
      <b-input-group class="reestr__table_search">
        <b-form-input v-model="text" placeholder="Поиск" />
        <b-input-group-append>
          <b-btn variant="primary">Найти</b-btn>
        </b-input-group-append>
        <base-period-select class="reestr__table_search_period" />
      </b-input-group>
      <div>
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

      <template #cell(comment)="{ value }">
        <b-button class="reestr__btn_badge" size="sm" variant="success" pill>
          <span>Комментировать</span>
          <b-badge
            @click.prevent="showFiles"
            class="reestr__badge"
            variant="info"
            >{{ value.length }}</b-badge
          >
        </b-button>
      </template>

      <template #cell(files_act)="{ value }">
        <b-button class="reestr__btn_badge" size="sm" variant="primary">
          <span>посмотреть</span>
          <b-badge
            @click.prevent="showFiles"
            class="reestr__badge"
            variant="info"
            >{{ value.length }}</b-badge
          >
        </b-button>
      </template>

      <template #cell(files_invoice)="{ value }">
        <b-button class="reestr__btn_badge" size="sm" variant="secondary">
          <span>посмотреть</span>
          <b-badge
            @click.prevent="showFiles"
            class="reestr__badge"
            variant="info"
            >{{ value.length }}</b-badge
          >
        </b-button>
      </template>

      <template #cell(files_check)="{ value }">
        <b-button class="reestr__btn_badge" size="sm" variant="primary">
          <span>посмотреть</span>
          <b-badge
            @click.prevent="showFiles"
            class="reestr__badge"
            variant="info"
            >{{ value.length }}</b-badge
          >
        </b-button>
      </template>

      <template #cell(files_ticket)="{ value }">
        <b-button class="reestr__btn_badge" size="sm" variant="secondary">
          <span>посмотреть</span>
          <b-badge
            @click.prevent="showFiles"
            class="reestr__badge"
            variant="info"
            >{{ value.length }}</b-badge
          >
        </b-button>
      </template>

      <template #cell(files_trn)="{ value }">
        <b-button class="reestr__btn_badge" size="sm" variant="primary">
          <span>посмотреть</span>
          <b-badge
            @click.prevent="showFiles"
            class="reestr__badge"
            variant="info"
            >{{ value.length }}</b-badge
          >
        </b-button>
      </template>

      <template #cell(files_other)="{ value }">
        <b-button class="reestr__btn_badge" size="sm" variant="secondary">
          <span>посмотреть</span>
          <b-badge
            @click.prevent="showFiles"
            class="reestr__badge"
            variant="info"
            >{{ value.length }}</b-badge
          >
        </b-button>
      </template>

      <template #cell(files_order)="{ value }">
        <b-button class="reestr__btn_badge" size="sm" variant="primary">
          <span>посмотреть</span>
          <b-badge
            @click.prevent="showFiles"
            class="reestr__badge"
            variant="info"
            >{{ value.length }}</b-badge
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
  </div>
</template>

<script>
import Vue from "vue";
import { headers } from "./constants/tableHeaders";

import demoData from "@/demo/ReestrDemo.json";
import { DealList } from "@/models/Deal";

export default Vue.extend({
  name: "PageReestr",
  data() {
    return {
      headers,
      demoData: new DealList(demoData).deals,
      selected: [],
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15, { value: 100, text: "Все" }],
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
      flexy(space-between,flex-start)
      margin 30px 0px
      &_btn
        margin 0px 10px
    &_search
      flexy(center,center)
      max-width 700px
      &_period
        margin-left 50px !important
  &__datepicker
    width 150px !important
  &__badge
    background white
    color black !important
    margin-left 10px
  &__btn
    &_badge
      display:flex !important
      flexy(center,center)
</style>
