<template>
  <div :class="{ 'comment-card_full': isFull }" class="comment-card">
    <h4 class="comment-card__date">{{ formatDate(comment.created_at) }}</h4>
    <div class="comment-card__card">
      <div class="comment-card__text">
        {{
          isFull ? comment.messages : `${comment.messages.slice(0, 120)}.....`
        }}
      </div>
    </div>
    <div class="comment-card__action">
      <p @click="toogle" class="comment-card__action_btn">
        {{ isFull ? "Скрыть" : "Читать полностью" }}
      </p>
    </div>
  </div>
</template>

<script>
import FormatedDate from "@/helpers/DateFormat";

export default {
  name: "CommentCard",
  data() {
    return {
      isFull: false,
    };
  },
  props: {
    comment: {
      default: () => {
        return {};
      },
    },
  },
  mounted() {
    console.log(this.comment);
  },
  methods: {
    toogle() {
      this.isFull = !this.isFull;
    },
    formatDate(date) {
      return FormatedDate.getDateAndTimeRu(date);
    },
  },
};
</script>

<style lang="stylus">
@require '~@/assets/stylus/vars/variables';
@require '~@/assets/stylus/mixins/mixins';

.comment-card
    &__card
        width 100%
        background: var(--blue)
        color white
        padding 20px
        border-radius 40px
        display: -webkit-box;
        &_full
            max-height auto
    &__date
        margin-left 20px
        font-size 16px
        font-weight bold
    &__action
        flexy(flex-end,center)
        font-size 14px
        padding-right 20px
        padding top
        font-weight bold
        color gray
        text-align right
        &_btn
            cursor pointer
</style>
