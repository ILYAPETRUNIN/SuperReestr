<template>
  <b-input-group>
    <b-form-input :disabled="disabled" v-model="text" placeholder="Поиск" />
    <b-input-group-append>
      <b-btn :disabled="disabled" @click="search" variant="primary"
        >Найти</b-btn
      >
    </b-input-group-append>
  </b-input-group>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      text: "",
    };
  },
  methods: {
    search() {
      this.$emit("search", this.text);
    },
  },
};
</script>

<style></style>
