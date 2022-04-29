<template>
  <b-form-select
    label-field="Компания"
    class="company-select"
    size="lg"
    v-model="inputVal"
    :options="options"
  />
</template>

<script>
const options = [
  { value: "", text: "Выберите компанию", disabled: true },
  { value: "a", text: "Компания 1" },
  { value: "b", text: "Компания 2" },
  { value: "c", text: "Компания 3" },
  { value: "d", text: "Компания 4" },
];

export default {
  name: "CompanySelect",
  data() {
    return {
      options,
    };
  },
  props: {
    value: {
      type: String,
      default: "",
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
};
</script>

<style lang="stylus">
@require '~@/assets/stylus/vars/variables';
@require '~@/assets/stylus/mixins/mixins';
.company-select
  height 40px !important
  font-size 14px !important
</style>
