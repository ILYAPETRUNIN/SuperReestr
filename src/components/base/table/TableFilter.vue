<template>
  <b-form class="filter">
    <base-search
      v-if="text"
      v-model="inputVal.text"
      class="filter__input filter__input_text"
    />
    <div class="filter__wrapper">
      <component
        class="filter__input"
        v-for="(item, index) in schema"
        :key="index"
        :is="item.component"
        v-model="inputVal[item.model]"
      />
      <b-btn
        type="reset"
        @click="resetFilter"
        class="filter__btn"
        variant="danger"
        >Сбросить</b-btn
      >
    </div>
  </b-form>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "TableFilter",
  data() {
    return {
      init: null,
    };
  },
  props: {
    value: {
      default: {},
    },
    text: {
      type: Boolean,
      default: true,
    },
    schema: {
      default: {},
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

  methods: {
    resetFilter() {
      this.makeNotification("Действие", "Фильтр сброшен", "success");
      for (let key in this.inputVal) {
        if (typeof this.inputVal[key] == "object") {
          const obj = this.inputVal[key];
          for (let key in obj) {
            obj[key] = null;
          }
        } else this.inputVal[key] = null;
      }
    },
    searchText(text) {
      this.inputVal.text = text;
    },
  },
});
</script>

<style lang="stylus">
@require '~@/assets/stylus/vars/variables';
@require '~@/assets/stylus/mixins/mixins';
    .filter
      flexy(space-between,flex-start,wrap)
      margin 30px 0px
      &__wrapper
        flexy(center,center,nowrap)
      &__input
        margin-right 10px
        margin-bottom 10px
        &_text
            width 300px !important
      &__btn
        width 100%
        margin-bottom 10px
</style>
