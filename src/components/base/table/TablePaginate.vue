<template>
  <div class="paginate-table">
    <b-pagination
      class="paginate-table__paginate"
      v-model="inputVal"
      :total-rows="totalItems"
      :per-page="limit"
      aria-controls="my-table"
    />
    <b-form-select v-model="limit" :options="pageOptions" />
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "TablePaginate",
  data() {
    return {
      pageOptions: [5, 10, 15, 50, 100],
      limit: 5,
    };
  },
  props: {
    value: {
      type: Number,
      default: 1,
    },
    totalItems: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    inputVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  methods: {},

  watch: {
    limit(val) {
      this.$emit("changeLimit", val);
    },
  },
});
</script>

<style lang="stylus">
@require '~@/assets/stylus/vars/variables';
@require '~@/assets/stylus/mixins/mixins';
.paginate-table
    flexy(center,center)
    &__paginate
      margin 0px
      margin-right 20px
</style>
