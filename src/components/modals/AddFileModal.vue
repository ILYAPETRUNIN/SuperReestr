<template>
  <b-modal
    button-size="sm"
    scrollable
    centered
    v-model="inputVal"
    hide-footer
    class="add-file-modal"
  >
    <template #modal-header="{ close }">
      <div class="add-file-modal__header">
        <div class="add-file-modal__header_title">Добавить файл</div>
        <b-button
          pill
          @click="close()"
          variant="danger"
          class="create-deal-modal__item_btn"
          size="sm"
        >
          <b-icon scale="2" icon="x-circle" aria-label="Help"></b-icon>
        </b-button>
      </div>
    </template>

    <b-form id="formCreateDeal" @submit="onSubmit" @reset="onReset">
      <b-form-group label="Документы" :label-for="`input-7-${_uid}`">
        <b-form-file
          :disabled="loading"
          :id="`input-7-${_uid}`"
          v-model="form.documents"
          multiple
        />
      </b-form-group>

      <div class="create-deal-modal__btns">
        <b-button
          :disabled="loading"
          class="create-deal-modal__btn"
          type="submit"
          variant="primary"
        >
          <b-spinner v-if="loading" small></b-spinner>
          Создать
        </b-button>
        <b-button :disabled="loading" type="reset" variant="danger"
          >Сбросить</b-button
        >
      </div>
    </b-form>
  </b-modal>
</template>

<script>
export default {
  name: "CreateDealModal",
  data() {
    return {
      form: {
        deal: null,
        company_name: null,
        own_company: null,
        pre_amount: null,
        pre_amount_date: null,
        account: null,
        documents: [],
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
    typePayment: {
      type: String,
      default: "pre",
      validator(value) {
        return ["pre", "full"].includes(value);
      },
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
    onSubmit(event) {
      event.preventDefault();
      this.$emit("submit", this.form);
    },
    onReset(event) {
      event.preventDefault();

      for (let key in this.form) {
        this.form[key] = null;
      }
    },
  },
};
</script>

<style lang="stylus">
@require '~@/assets/stylus/vars/variables';
@require '~@/assets/stylus/mixins/mixins';
.create-deal-modal
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
