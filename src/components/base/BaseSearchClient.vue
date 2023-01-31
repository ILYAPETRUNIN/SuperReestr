<template>
  <b-input-group class="col-sm">
    <b-form-input :disabled="disabled" v-model="text" placeholder="Поиск" />
    <b-form-input :disabled="disabled" v-model="inn" placeholder="ИНН" />
    <b-form-input
      :disabled="disabled"
      v-model="invoice_id"
      placeholder="ID Счета"
    />
    <b-form-select v-model="defect" :options="options_defect" />
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
      inn: "",
      invoice_id: "",
      defect: false,
      options_defect: [
        { value: true, text: "Только дефектные" },
        { value: false, text: "Все записи" },
      ],
    };
  },
  methods: {
    search() {
      this.$emit("input", {
        text: this.text,
        inn: this.inn,
        invoice_id: this.invoice_id,
        defect: this.defect,
      });
    },
  },
};
</script>

<style></style>
