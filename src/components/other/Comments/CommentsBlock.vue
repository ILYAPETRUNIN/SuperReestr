<template>
  <div class="comments-block">
    <comment-card
      :comment="comment"
      v-for="(comment, index) in comments"
      :key="index"
    />
  </div>
</template>

<script>
import CommentCard from "./CommentCard.vue";
export default {
  name: "CommentsBlock",
  components: { CommentCard },
  props: {
    comments: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style></style>
