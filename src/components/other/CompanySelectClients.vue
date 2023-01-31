<template>
  <b-container size="lg">
    <b-row>
      <b-col>
        <b-form-select
          :disabled="loading || options.length == 0"
          label-field="Компания"
          class="company-select"
          size="lg"
          v-model="inputVal"
          :options="options"
        />
      </b-col>
      <b-col>
        <b-form-select v-model="defectVal" :options="options_defect" />
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import ClientReestrApi from "@/services/api/ClientReestrApi";

// const options = [
//   { value: "", text: "Выберите компанию", disabled: true },
//   { value: "a", text: "Компания 1" },
//   { value: "b", text: "Компания 2" },
//   { value: "c", text: "Компания 3" },
//   { value: "d", text: "Компания 4" },
// ];

export default {
  name: "CompanySelectClients",
  data() {
    return {
      loading: false,
      options: [],
      defect: false,
      options_defect: [
        { value: true, text: "Только дефектные" },
        { value: false, text: "Все записи" },
      ],
    };
  },
  props: {
    value: {
      type: String,
      default: null,
    },
  },
  mounted() {
    this.loading = true;
    ClientReestrApi.getCompanies()
      .then((items) => {
        this.options = items.map((item) => {
          return { value: item.id, text: item.OwnCompany };
        });
        this.options.unshift({
          value: null,
          text: "Выберите компанию",
        });
      })
      .catch((e) => {
        throw e;
      })
      .finally((this.loading = false));
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

    defectVal: {
      get() {
        return this.defect;
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
