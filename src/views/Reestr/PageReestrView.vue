<template>
  <div class="custom-table">
    <div class="custom-table__actions"></div>

    <div class="custom-table__filter">
      <table-filter v-model="model" :schema="schema" />
      <div class="custom-table__filter_btns"></div>
    </div>

    <b-table
      id="reestr-table"
      hover
      striped
      class="custom-table__table"
      selectable
      select-mode="multi"
      responsive
      :fields="headers"
      :items="items"
      :busy="loading"
      ref="selectableTable"
      bordered
      :per-page="filters.limit"
      :tbody-tr-attr="rowColor"
      @row-clicked="toogleRow"
      sticky-header
    >
      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle mr-2"></b-spinner>
          <strong>Загрузка...</strong>
        </div>
      </template>

      <template #head(selected)="">
        <b-checkbox @input="toogleAll" />
      </template>

      <template #cell(selected)="{ rowSelected }">
        <b-checkbox :checked="rowSelected" disabled />
      </template>

      <template #cell(index)="{ index }">
        {{ index + filters.offset + 1 }}
      </template>

      <template #cell(id)="{ value }">
        {{ value }}
      </template>

      <template #cell(pre_amount)="{ value, item }">
        <base-editable-text
          :value="value"
          @update="changePayment(item.id, 'p', $event)"
        />
      </template>

      <template #cell(summ_amount)="{ value, item }">
        <base-editable-text
          :value="value"
          @update="changePayment(item.id, 'f', $event)"
        />
      </template>

      <template #cell(pre_amount_date)="{ item, value }">
        <b-form-datepicker
          class="reestr__datepicker"
          :date-format-options="{
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          }"
          locale="ru"
          :value="value"
          :placeholder="item"
          :disabled="true"
        />
      </template>

      <template #cell(full_amount_date)="{ item, value }">
        <b-form-datepicker
          class="reestr__datepicker"
          :date-format-options="{
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          }"
          locale="ru"
          :value="value"
          :placeholder="item"
          :disabled="true"
        />
      </template>

      <template #cell(comment)="{ value, item }">
        <b-button
          @click="commentModal(item, 'create')"
          class="reestr__btn_badge"
          size="sm"
          variant="outline-dark"
          pill
        >
          <span>Комментировать</span>
          <b-badge
            @click.stop="commentModal(item, 'show')"
            class="reestr__badge"
            >{{ value.length }}</b-badge
          >
        </b-button>
      </template>

      <template
        v-slot:[`cell(${name})`]="{ value, field }"
        v-for="name in nameFiles"
      >
        <b-button
          @click="openLastFile(value)"
          :key="name"
          class="reestr__btn_badge"
          size="sm"
          variant="outline-dark"
        >
          <span>посмотреть</span>
          <b-badge
            @click.stop="showModal(field.label, value)"
            class="reestr__badge"
            variant="info"
            >{{ value.length }}
          </b-badge>
        </b-button>
      </template>

      <template #cell(status)="{ item }">
        <b-dropdown size="sm" class="m-2">
          <b-dropdown-item-button
            @click="setStatusPayment(item.id, statusPayment.id)"
            v-for="statusPayment in statusPaymentList"
            :key="statusPayment.id"
          >
            <div class="reestr__statusPayment">
              <div
                :style="{ background: statusPayment.color }"
                class="reestr__statusPayment_badge"
              />
              {{ statusPayment.text }}
            </div>
          </b-dropdown-item-button>
        </b-dropdown>
      </template>
    </b-table>

    <table-paginate
      v-model="page"
      :totalItems="totalItems"
      @changeLimit="limit = $event"
    />

    <files-modal
      :title="modalFiles.title"
      :files="modalFiles.files"
      v-model="modalFiles.state"
    />
    <create-deal-modal
      :loading="createLoading"
      :typePayment="modalCreate.type == 'future_payment' ? 'pre' : 'full'"
      @submit="createDeal"
      v-model="modalCreate.state"
    />
    <comment-modal
      @submit="createComment"
      :comments="modalComment.comments"
      :type="modalComment.type"
      v-model="modalComment.state"
    />
  </div>
</template>

<script>
import Vue from "vue";
import { headers } from "./constants/tableHeaders";

import FilesModal from "@/components/modals/FilesModal.vue";
import CreateDealModal from "@/components/modals/CreateDealModal.vue";
import CommentModal from "@/components/modals/CommentModal.vue";

import FileAction from "@/helpers/FileAction";
import PrintActions from "@/helpers/PrintActions";

import ReestrApi from "@/services/api/ReestrApi";
import PaginateMixin from "@/mixins/PaginateMixin";
import TableSelectMixin from "@/mixins/TableSelectMixin";

import { model, schema } from "./constants/filter.ts";

import nameFiles from "./constants/nameFiles.ts";

export default Vue.extend({
  name: "PageReestr",
  components: { FilesModal, CreateDealModal, CommentModal },
  mixins: [PaginateMixin, TableSelectMixin],
  data() {
    return {
      loading: false,
      createLoading: false,
      headers,
      items: [],
      modalFiles: {
        state: false,
        files: [],
        title: "",
      },
      modalCreate: {
        state: false,
        type: "future_payment",
      },
      modalComment: {
        state: false,
        comments: [],
        type: "create",
        id: null,
      },
      nameFiles,
      schema,
      model,
      statusPaymentList: [],
    };
  },

  methods: {
    showModal(label, files) {
      this.modalFiles.state = true;
      this.modalFiles.files = files;
      this.modalFiles.title = label;
    },
    openLastFile(files) {
      FileAction.open(files[files.length - 1].path);
    },
    print() {
      let thead = [
        "index",
        "deal",
        "account_number",
        "own_comapny",
        "company_name",
        "pre_amount",
        "summ_amount",
        "preAmountDateFormat",
        "fullAmountDateFormat",
      ];

      PrintActions.printTable({
        headers: [
          ...headers.filter((item) => thead.includes(item.key)),
          { key: "preAmountDateFormat", label: "Дата предоплаты" },
          { key: "fullAmountDateFormat", label: "Дата полной оплаты" },
        ],
        data: this.selected.map((item, index) => {
          let obj = {};
          thead.forEach((head) => {
            if (head == "index") {
              obj.index = index + 1;
              this.indexRow++;
            } else obj[head] = item[head];
          });
          return obj;
        }),
      });
    },
    formReestr() {
      if (this.selected.length > 0) {
        ReestrApi.sendToPayment(this.selected.map((item) => item.id))
          .then(() => {
            this.fetch();
            this.makeNotification("Действие", "Реестр сформирован", "success");
          })
          .catch(() => {
            this.makeNotification(
              "Ошибка",
              "Не удалось сформировать реестр",
              "danger"
            );
          });
      } else {
        this.makeNotification(
          "Информация",
          "Выберите хотя бы одну строку",
          "danger"
        );
      }
    },
    async fetch() {
      this.loading = true;
      const search = { ...this.model, ...this.model.date };
      delete search.date;

      const params = { ...search, ...this.filters };
      ReestrApi.getList(params)
        .then((res) => {
          this.totalItems = res.size;
          this.items = res.res;
          this.loading = false;
          setTimeout(this.initTable.bind(this), 100);
        })
        .catch(console.error);
    },
    fetchStatusPayment() {
      ReestrApi.getStatusPaymentList()
        .then((res) => {
          this.statusPaymentList = res;
        })
        .catch(console.error);
    },
    changeDate(id, date, key) {
      ReestrApi.changeDatePayment({ id, [key]: date })
        .then(() => {
          this.makeNotification("Действие", "Дата оплаты изменена", "success");
        })
        .catch(() => {
          this.makeNotification(
            "Ошибка",
            "Не удалось изменить дату оплаты",
            "danger"
          );
        });
    },
    rowColor(item, type) {
      if (!item || type !== "row") return;
      return { style: `background:${item.status_color}` };
    },
    setStatusPayment(id, status_id) {
      ReestrApi.setStatusPayment({ id, status_id })
        .then(() => {
          this.fetch();
          this.makeNotification("Действие", "Статус оплаты изменён", "success");
        })
        .catch(() => {
          this.makeNotification(
            "Ошибка",
            "Не удалось изменить статус оплаты",
            "danger"
          );
        });
    },
    changePayment(id, type, sum) {
      ReestrApi.changePayment({ id, type, sum })
        .then(() => {
          const data = this.items.find((item) => item.id == id);
          if (type == "p") data.pre_amount = sum;
          else data.summ_amount = sum;
          this.makeNotification("Действие", "Сумма оплаты изменена", "success");
        })
        .catch(() => {
          this.makeNotification(
            "Ошибка",
            "Не удалось изменить сумму платежа",
            "danger"
          );
        });
    },

    createDeal(params) {
      this.createLoading = true;
      let form = new FormData();

      for (let key in params) {
        if (key != "documents") form.append(key, params[key]);
        else {
          params[key].forEach((file) => form.append("documents[]", file));
        }
      }

      ReestrApi.createPayment(form, this.modalCreate.type)
        .then(() => {
          this.fetch();
          this.modalCreate.state = false;
          this.makeNotification("Действие", "Сделка создана", "success");
        })
        .catch(() => {
          this.makeNotification(
            "Ошибка",
            "Не удалось создать сделку",
            "danger"
          );
        })
        .finally(() => (this.createLoading = false));
    },
    commentModal(item, type) {
      this.modalComment = {
        state: true,
        id: item.id,
        comments: item.comment,
        type,
      };
    },
    createComment({ messages }) {
      ReestrApi.createComment({ registry_id: this.modalComment.id, messages })
        .then(() => {
          this.fetch();
          this.modalComment.state = false;
          this.makeNotification("Действие", "Комментарий добавлен", "success");
        })
        .catch(() => {
          this.makeNotification(
            "Ошибка",
            "Не удалось добавить комментарий",
            "danger"
          );
        });
    },
  },
  async mounted() {
    this.fetch();
    this.fetchStatusPayment();
  },

  watch: {
    filters() {
      this.fetch();
    },
    model: {
      handler() {
        this.fetch();
      },
      deep: true,
    },
  },
});
</script>

<style lang="stylus">
@require '~@/assets/stylus/vars/variables';
@require '~@/assets/stylus/mixins/mixins';
@require '~@/assets/stylus/style/table.styl';

.reestr
  &__statusPayment
      flexy(flex-start,center)
      &_badge
        margin-right 10px
        width 50px
        height 25px
  &__datepicker
    width 150px !important
  &__badge
    background white !important
    color black !important
    margin-left 10px
  &_btns
     padding 30px
  &__btn
    &_badge
      display:flex !important
      flexy(center,center)
</style>
