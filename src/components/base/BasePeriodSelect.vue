<template>
  <div class="base-period-select">
    <div class="base-period-select__datapicker">
      <b-form-datepicker
        :disabled="disabled"
        class="reestr__datepicker"
        :date-format-options="{
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        }"
        locale="ru"
        v-model="inputVal.date_to"
        placeholder="От"
      />
    </div>
    <span class="base-period-select__separator">—</span>
    <div class="base-period-select__datapicker">
      <b-form-datepicker
        :disabled="disabled"
        class="reestr__datepicker"
        :date-format-options="{
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        }"
        locale="ru"
        v-model="inputVal.date_from"
        placeholder="До"
      />
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "BasePeriodSelect",
  props: {
    value: {
      default: { date_to: null, date_from: null },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    inputVal: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    reset() {
      this.inputVal = { date_to: null, date_from: null };
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
