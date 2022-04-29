<template>
  <div class="base-period-select">
    <div class="base-period-select__datapicker">
      <b-form-datepicker
        class="reestr__datepicker"
        :date-format-options="{
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        }"
        locale="ru"
        v-model="inputVal.to"
        placeholder="От"
      />
    </div>
    <span class="base-period-select__separator">—</span>
    <div class="base-period-select__datapicker">
      <b-form-datepicker
        class="reestr__datepicker"
        :date-format-options="{
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        }"
        locale="ru"
        v-model="inputVal.from"
        placeholder="До"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import Period from "@/models/types";

export default Vue.extend({
  name: "BasePeriodSelect",
  props: {
    value: {
      type: Period,
      default: () => new Period({ to: null, from: null }),
    },
  },
  computed: {
    inputVal: {
      get(): Period {
        return this.value;
      },
      set(value: Period) {
        this.$emit("input", value);
      },
    },
  },
});
</script>

<style lang="stylus">
@require '~@/assets/stylus/vars/variables';
@require '~@/assets/stylus/mixins/mixins';
.base-period-select
  flexy(center,center)
  &__datapicker
    flexy(center,center)
    p
      margin 0px
      margin-right 10px
  &__separator
    margin 0px 10px
</style>
