<template>
  <div class="reestr">
    <div class="reestr__actions"></div>

    <div class="reestr__table_filter">
      <table-filter v-model="model" :schema="schema" />
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
    </b-table>

    <table-paginate
      v-model="page"
      :totalItems="totalItems"
      @changeLimit="limit = $event"
    />
  </div>
</template>

<script>
import Vue from "vue";
import { headers } from "./constants/tableHeaders";

import PaginateMixin from "@/mixins/PaginateMixin";
import TableSelectMixin from "@/mixins/TableSelectMixin";

import { model, schema } from "./constants/filter.ts";

export default Vue.extend({
  name: "PageClients",
  mixins: [PaginateMixin, TableSelectMixin],
  data() {
    return {
      loading: false,
      headers,
      items: [],
      schema,
      model,
    };
  },

  methods: {
    async fetch() {
      this.loading = true;
      const search = { ...this.model, ...this.model.date };
      delete search.date;

      const params = { ...search, ...this.filters };
      //Тут запрос
    },
  },
  async mounted() {
    this.fetch();
  },

  watch: {
    filters() {
      this.fetch();
    },
    model: {
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
    margin-right 10px
  &__table
    width 100%
    max-height: 800px !important
    &_filter
      width 100%
      flexy(space-between,flex-start,wrap)
      margin 30px 0px
      &_btns
        margin-top 30px
      &_btn
        margin 0px 10px
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
