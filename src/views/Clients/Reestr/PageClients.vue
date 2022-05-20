<template>
  <div class="reestr">
    <div class="reestr__actions"></div>

    <div class="reestr__table_filter">
      <div class="reestr__table_search">
        <base-search @search="searchText" class="reestr__table_search_text" />
        <div class="reestr__table_search_wrapper">
          <b-btn
            :disabled="loading"
            @click="resetFilter"
            class="reestr__table_filter_btn"
            variant="danger"
            >Сбросить</b-btn
          >
        </div>
      </div>
      <div class="reestr__table_filter_btns"></div>
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
      :per-page="filters.limit"
      :tbody-tr-attr="rowColor"
      @row-clicked="toogleRow"
      sticky-header
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

      <template #cell(selected)="{ rowSelected }">
        <b-checkbox :checked="rowSelected" disabled />
      </template>

      <template #cell(index)="{ index }">
        {{ index + 1 }}
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
      />
      <b-form-select v-model="limit" :options="pageOptions" />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { headers } from "./constants/tableHeaders";
import PaginateMixin from "@/mixins/PaginateMixin";
import TableSelectMixin from "@/mixins/TableSelectMixin";

export default Vue.extend({
  name: "PageClients",
  mixins: [PaginateMixin, TableSelectMixin],
  data() {
    return {
      loading: false,
      headers,
      items: [],
      pageOptions: [5, 10, 15, 50, 100],
      search: {
        text: null,
      },
    };
  },

  methods: {
    resetFilter() {
      this.makeNotification("Действие", "Фильтр сброшен", "success");
      this.search = {
        text: null,
      };
    },

    searchText(text) {
      this.search.text = text;
    },
    rowColor(item, type) {
      if (!item || type !== "row") return;
      return { style: `background:${item.status_color}` };
    },

    initTable() {
      this.items.forEach((el, index) => {
        if (this.selected.find((selEl) => el.id == selEl.id)) {
          this.$refs.selectableTable.selectRow(index);
        }
      });
    },
  },
  async mounted() {
    // this.fetch();
  },

  watch: {
    filters() {
      // this.fetch();
    },
    search: {
      handler() {
        // this.fetch();
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
    margin-right 10px
  &__table
    width 100%
    max-height: 800px !important
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
