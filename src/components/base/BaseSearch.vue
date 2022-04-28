<template>
  <b-input-group>
    <b-form-input v-model="text" placeholder="Поиск" />
    <b-input-group-append>
      <b-btn @click="search" variant="primary">Найти</b-btn>
    </b-input-group-append>
  </b-input-group>
</template>

<script>
export default {
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
