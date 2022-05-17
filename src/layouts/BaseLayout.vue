<template>
  <div class="baseLayout">
    <deal-info />
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

import DealInfo from "@/components/other/DealInfo.vue";

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
  components: { DealInfo },
  data() {
    return {
      links,
      tabIndex: 2,
    };
  },
  mounted() {
    setTimeout(() => {
      this.tabIndex = 2;
    }, 5);
  },
  watch: {
    tabIndex(val) {
      this.$router.push({ name: this.links[val].to });
    },
  },
});
</script>

<style></style>
