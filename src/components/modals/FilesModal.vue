<template>
  <b-modal
    button-size="sm"
    scrollable
    :title="title"
    centered
    v-model="inputVal"
    class="files-modal"
  >
    <template #modal-header="{ close }">
      <div class="files-modal__header">
        <div class="files-modal__header_title">{{ title }}</div>
        <b-button
          pill
          @click="close()"
          variant="danger"
          class="files-modal__item_btn"
          size="sm"
        >
          <b-icon scale="2" icon="x-circle" aria-label="Help"></b-icon>
        </b-button>
      </div>
    </template>
    <ul v-if="files.length != 0">
      <li
        class="files-modal__item"
        v-for="(file, index) in files"
        :key="file.id"
      >
        <div class="files-modal__item_index">{{ index + 1 }})</div>
        <div>{{ file.date }}</div>
        <div>
          <b-btn
            @click="openFile(file)"
            class="files-modal__item_btn"
            variant="success"
            size="sm"
            >Открыть</b-btn
          >
          <b-button class="files-modal__item_btn" size="sm" variant="danger">
            <b-icon icon="trash" aria-label="Help"></b-icon>
          </b-button>
        </div>
      </li>
    </ul>
    <div class="files-modal__not" v-else>Нет файлов</div>
  </b-modal>
</template>

<script>
import FileAction from "@/helpers/FileAction";

export default {
  name: "FilesModal",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    files: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: "",
    },
  },
  computed: {
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
    openFile(file) {
      FileAction.open(file.name);
    },
  },
};
</script>

<style lang="stylus">
@require '~@/assets/stylus/vars/variables';
@require '~@/assets/stylus/mixins/mixins';
.files-modal
  &__header
    width 100%
    flexy(space-between)
    &_title
      font-size 20px
      font-weight bold
  &__item
    width 350px
    flexy(space-between,center)
    margin 20px 0
    &_index
      margin-right 10px
    &_btn
      margin 0px 10px
  &__not
    width 100%
    flexy(center,center)
</style>
