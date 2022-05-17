<template>
  <div class="deal-info">
    <div
      class="deal-info__item"
      v-for="(info, index) in statusPaymentList"
      :key="index"
    >
      <div class="deal-info__badge" :style="{ background: info.color }" />
      <div>{{ info.text }}</div>
    </div>
  </div>
</template>

<script>
import ReestrApi from "@/services/api/ReestrApi";

export default {
  mounted() {
    this.fetchStatusPayment();
  },
  data() {
    return {
      statusPaymentList: [],
    };
  },
  methods: {
    fetchStatusPayment() {
      ReestrApi.getStatusPaymentList()
        .then((res) => {
          this.statusPaymentList = res;
        })
        .catch(console.error);
    },
  },
};
</script>

<style lang="stylus">
@require '~@/assets/stylus/vars/variables';
@require '~@/assets/stylus/mixins/mixins';
.deal-info
  padding 30px
  &__item
    flexy()
  &__badge
    width 50px
    height 16px
    margin-right 10px
</style>
