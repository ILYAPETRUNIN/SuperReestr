<template>
  <div class="developing">
    <img src="@/assets/img/razrabotka.png" alt="" />
    <div class="developing__text">
      <b-spinner class="developing__spinner" variant="primary"></b-spinner>
      Пожалуйста зайдите позднее...
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "PageDeveloping",
});
</script>

<style lang="stylus">
@require '~@/assets/stylus/vars/variables';
@require '~@/assets/stylus/mixins/mixins';

.developing
  flexy(center,center,nowrap,column)
  width 100%
  height 100vh
  font-size 15px
  &__text
    flexy(center,center)
    margin-top 30px
  &__spinner
    margin 0px 20px
</style>
