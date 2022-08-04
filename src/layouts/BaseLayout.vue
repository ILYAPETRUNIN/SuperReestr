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
import Cookies from "vue-cookies";
import DealInfo from "@/components/other/DealInfo.vue";

Vue.use(Cookies);
let page_view = Vue.$cookies.get("page_view");

const links = [
  { name: "Сканы", to: "scans" },
  { name: "Оригинал", to: "originals" },
  { name: "Реестр оплат(просмотр)", to: "reestr_view" },
  { name: "На оплату", to: "forPayment" },
  { name: "Договор п.", to: "contract1" },
  { name: "Договор к.", to: "contract2" },
  { name: "Клиенты", to: "clients" },
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
      if (page_view) {
        links[2].name = "Реестр оплат";
        links[2].to = "reestr";
      }

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
