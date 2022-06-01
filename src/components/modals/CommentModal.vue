<template>
  <b-modal
    button-size="sm"
    scrollable
    centered
    v-model="inputVal"
    hide-footer
    class="comment-modal"
  >
    <template #modal-header="{ close }">
      <div class="comment-modal__header">
        <div class="comment-modal__header_title">
          {{ isCreate ? "Комментировать" : "Смотреть комментарии" }}
        </div>
        <b-button
          pill
          @click="close()"
          variant="danger"
          class="comment-modal__item_btn"
          size="sm"
        >
          <b-icon scale="2" icon="x-circle" aria-label="Help"></b-icon>
        </b-button>
      </div>
    </template>

    <b-form v-if="isCreate" :id="`form-${_uid}`" @submit.prevent="onSubmit">
      <b-form-group label="Комментарий*" :label-for="`input-1${_uid}`">
        <b-form-textarea
          :disabled="loading"
          :id="`input-1${_uid}`"
          v-model="form.messages"
          placeholder="Введите комментарий"
          required
          rows="8"
        />
      </b-form-group>
      <div class="comment-modal__btns">
        <b-button
          :disabled="loading"
          class="comment-modal__btn"
          type="submit"
          variant="primary"
        >
          <b-spinner v-if="loading" small></b-spinner>
          Создать
        </b-button>
      </div>
    </b-form>

    <comments-block :comments="comments" v-else />
  </b-modal>
</template>

<script>
import CommentsBlock from "@/components/other/Comments/CommentsBlock.vue";
export default {
  name: "CommentModal",
  components: { CommentsBlock },
  data() {
    return {
      form: {
        messages: null,
      },
    };
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "create",
      validator(value) {
        return ["create", "show"].includes(value);
      },
    },
    comments: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    isCreate() {
      return this.type == "create";
    },
    inputVal: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    onSubmit() {
      this.$emit("submit", this.form);
    },
  },
};
</script>

<style lang="stylus">
@require '~@/assets/stylus/vars/variables';
@require '~@/assets/stylus/mixins/mixins';
.comment-modal
  &__header
    width 100%
    flexy(space-between)
    &_title
      font-size 20px
      font-weight bold
  &__btns
    width 100%
    flexy(flex-end,center)
  &__btn
    margin-right 10px
  &__item
    width 350px
    flexy(space-between,center)
    margin 20px 0
    &_index
      margin-right 10px
    &_btn
      margin 0px 10px
</style>
