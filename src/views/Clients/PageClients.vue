<template>
  <div class="custom-table">
    <div class="custom-table__actions"></div>

    <div class="custom-table__filter">
      <table-filter v-model="model" :schema="schema" />
      <div class="custom-table__filter_btns"></div>
    </div>

    <b-table
      hover
      striped
      class="custom-table__table"
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
      //Тут будет запрос
    },
    rowColor(item, type) {
      if (!item || type !== "row") return;
      return { style: `background:${item.status_color}` };
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
@require '~@/assets/stylus/style/table.styl';
</style>
