<template>
  <div class="not-found">
    <span class="not-found__text">OOPS!!!</span>
    <div class="not-found__404">
      <span>4</span>
      <img src="@/assets/img/notFound.jpg" alt="" />
      <span>4</span>
    </div>
    <span class="not-found__text">Not Found</span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "NotFound",
});
</script>

<style lang="stylus">
@require '~@/assets/stylus/vars/variables';
@require '~@/assets/stylus/mixins/mixins';

.not-found
  flexy(center,center,nowrap,column)
  width 100%
  height 100vh
  font-size 200px
  &__404
    flexy(center,center,nowrap)
  &__text
    flexy(center,center,nowrap,column)
    font-size 40px
    font-weight bold
    color red
</style>
