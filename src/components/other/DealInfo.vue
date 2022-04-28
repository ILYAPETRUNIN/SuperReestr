<template>
  <div class="deal-info">
    <div
      class="deal-info__item"
      v-for="(info, index) in infoDeals"
      :key="index"
    >
      <div class="deal-info__badge" :style="{ background: info.color }" />
      <div>{{ info.text }}</div>
    </div>
  </div>
</template>

<script>
const infoDeals = [
  { color: "red", text: "Новые документы в процессе проверки" },
  { color: "green", text: "Документы проверены в полном комплекте" },
  { color: "pink", text: "Ожидание исправленных документов от перевоза" },
  {
    color: "yellow",
    text: "Проверены,нет квитка от перевоза,чтобы поставить в оплату",
  },
];
export default {
  data() {
    return {
      infoDeals,
    };
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
