<template>
  <div class="baseLayout">
    <b-tabs v-model="tabIndex">
      <b-tab
        v-for="(link, index) in links"
        :key="index"
        :title="link.name"
        active
      />
    </b-tabs>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

const links = [
  { name: "Сканы", to: "scans" },
  { name: "Оригинал", to: "originals" },
  { name: "Реестр оплат", to: "reestr" },
  { name: "На оплату", to: "forPayment" },
  { name: "Договор п.", to: "contract1" },
  { name: "Договор к.", to: "contract2" },
];

export default Vue.extend({
  name: "BaseLayout",
  data() {
    return {
      links,
      tabIndex: 0,
    };
  },
  methods: {
    next(name: string) {
      this.$router.push({ name });
    },
  },
  watch: {
    tabIndex(val) {
      this.$router.push({ name: this.links[val].to });
    },
  },
});
</script>

<style></style>
