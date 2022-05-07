<template>
  <div v-click-outside="hideInput" class="base-editable-text">
    <div v-if="!showInput" class="base-editable-text__text">{{ value }}</div>
    <b-form-input
      class="base-editable-text__input"
      v-model="inputData"
      v-else
      type="number"
    ></b-form-input>
    <b-button
      v-if="!showInput"
      @click="showInput = true"
      class="base-editable-text__btn"
      variant="success"
      size="sm"
    >
      <b-icon
        class="base-editable-text__btn_icon"
        size="sm"
        icon="pencil-fill"
        aria-hidden="true"
      />
    </b-button>
    <div class="base-editable-text__btns" v-else>
      <b-button
        @click="update"
        class="base-editable-text__btn"
        variant="success"
        size="sm"
      >
        <b-icon
          class="base-editable-text__btn_icon"
          size="sm"
          icon="check-lg"
          aria-hidden="true"
        />
      </b-button>
      <b-button
        @click="showInput = false"
        class="base-editable-text__btn"
        variant="danger"
        size="sm"
      >
        <b-icon
          class="base-editable-text__btn_icon"
          size="sm"
          icon="x-lg"
          aria-hidden="true"
        />
      </b-button>
    </div>
  </div>
</template>

<script>
import vClickOutside from "v-click-outside";

export default {
  directives: {
    clickOutside: vClickOutside.directive,
  },
  data() {
    return {
      showInput: false,
      inputData: this.value,
    };
  },
  props: {
    label: {
      type: String,
      default: "",
    },
    value: {
      default: "",
    },
  },
  computed: {},
  methods: {
    hideInput() {
      this.showInput = false;
    },
    update() {
      this.hideInput();
      this.$emit("update", this.inputData);
    },
  },
};
</script>

<style lang="stylus">
@require '~@/assets/stylus/vars/variables';
@require '~@/assets/stylus/mixins/mixins';
.base-editable-text
  width 100%
  height 100%
  flexy(center,center,nowrap)
  &__text
    width 50%
    font-weight bold
    margin-right 10px
  &__input
    width 100px !important
  &__btn
    display:flex !important
    flexy(center,center,nowrap)
    width 24px
    height 24px
    margin-left 5px
    &_icon
      width 14px
      height 14px
  &__btns
    flexy(center,center,nowrap)
</style>
