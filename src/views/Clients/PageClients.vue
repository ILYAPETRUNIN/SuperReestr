<template>
  <div class="custom-table">
    <div class="custom-table__actions"></div>
    <div class="custom-table__filter">
      <table-filter-client v-model="model" :schema="schema" />
      <div class="custom-table__filter_btns"></div>
    </div>
    <b-table
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
        {{ index + 1 }}
      </template>

      <template #cell(list_uslug)="{ value, item }">
        <b-list-group>
          <b-list-group-item
            v-for="uslug in value"
            :key="getNameUslug(uslug.name, item.id)"
          >
            {{ uslug.name }} - {{ format_currency(item, uslug.price) }}
          </b-list-group-item>
        </b-list-group>
      </template>

      <template #cell(company_own)="{ value }">
        {{ value.title }}
      </template>

      <template #cell(company)="{ value }">
        {{ value.title }}
      </template>

      <template
        v-slot:[`cell(${name})`]="{ value, field, item }"
        v-for="name in nameFiles"
      >
        <div class="btn-group" :key="genNameOpen(name)">
          <b-button
            @click="openLastFile(value)"
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

          <b-button
            @click="addFile(field, item)"
            :key="genName(name)"
            class="btn btn-default"
            variant="success"
            size="sm"
          >
            <b-icon
              class="base-addable-file__btn_icon"
              size="sm"
              icon="cloud-upload"
              aria-hidden="true"
            />
            <input
              @change="sendFiles(item, field)"
              :id="genNameInput(name, item.invoice_id)"
              type="file"
              :name="genNameInput(name, item.invoice_id)"
              :multiple="true"
              style="display: none"
            />
          </b-button>
        </div>
      </template>

      <template #cell(real_upload_at)="{ item }">
        <b-form-datepicker
          @input="addRealDate(item.invoice_id, $event)"
          class="reestr__datepicker"
          :date-format-options="{
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          }"
          locale="ru"
          :value="value"
          placeholder=""
        />
      </template>

      <template #cell(defect)="{ item }">
        <b-button :active="item.defect" @click="toggle_defect(item.invoice_id)">
          <b> Да </b>
        </b-button>
      </template>

      <template #cell(one_c)="{ item }">
        <b-button :active="!item.one_c" @click="get_one_c(item.invoice_id)">
          Отправить в 1С
        </b-button>
      </template>

      <template #cell(close)="{ item }">
        <b-button :active="!item.close" @click="get_close(item.invoice_id)">
          Закрыть
        </b-button>
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
  </div>
</template>

<script>
import Vue from "vue";
import { headers } from "./constants/tableHeaders";

import FilesModal from "@/components/modals/FilesModal.vue";
import PaginateMixin from "@/mixins/PaginateMixin";
import TableSelectMixin from "@/mixins/TableSelectMixin";
import ClientReestrApi from "@/services/api/ClientReestrApi";
import { model, schema } from "./constants/filter.ts";
import nameFiles from "./constants/nameFiles";
import FileAction from "@/helpers/FileAction";

export default Vue.extend({
  name: "PageClients",
  // eslint-disable-next-line vue/no-unused-components
  components: { FilesModal },
  mixins: [PaginateMixin, TableSelectMixin],
  data() {
    return {
      loading: false,
      headers,
      items: [],
      schema,
      model,
      nameFiles,
      modalFiles: {
        state: false,
        files: [],
        title: "",
      },
    };
  },

  methods: {
    async fetch() {
      this.loading = true;
      const search = { ...this.model, ...this.model.date };
      delete search.date;

      const params = { ...search, ...this.filters };
      ClientReestrApi.clientSearch(params)
        .then((res) => {
          this.totalItems = res.size;
          this.items = res.res;
          this.loading = false;
          setTimeout(this.initTable.bind(this), 100);
        })
        .catch(console.error);
    },

    async fetch_not_reload() {
      this.loading = false;
      const search = { ...this.model, ...this.model.date };
      delete search.date;
      const params = { ...search, ...this.filters };
      ClientReestrApi.clientSearch(params)
        .then((res) => {
          this.totalItems = res.size;
          this.items = res.res;
          this.loading = false;
          setTimeout(this.initTable.bind(this), 100);
        })
        .catch(console.error);
    },

    format_currency(fmt_str, price) {
      console.log(fmt_str);
      if (typeof fmt_str.currency == "undefined") return price;
      else return fmt_str.currency.replace("#", price);
    },
    rowColor(item, type) {
      if (!item || type !== "row") return;
      // || type !== "row"
      return { style: `background: ${item.state_invoice}` };
    },
    list_uslug(list_uslug) {
      if (list_uslug.length > 0) {
        return list_uslug.join("<br>");
      }
      return "";
    },
    get_one_c(id) {
      ClientReestrApi.setStatusOneC({ id: id })
        .then(() => {
          this.fetch_not_reload();
          this.makeNotification("Действие", "Счет выставлен в 1С", "success");
        })
        .catch(console.error);
    },
    get_close(id) {
      ClientReestrApi.setStatusClose({ id: id })
        .then((res) => {
          this.fetch_not_reload();
          this.makeNotification("Действие", "Счет закрыт", "success");
        })
        .catch(console.error);
    },

    toggle_defect(id) {
      ClientReestrApi.setStatusDefect({ id: id })
        .then((res) => {
          this.fetch_not_reload();
          this.makeNotification(
            "Действие",
            "Установлен статус 'дефектный'",
            "success"
          );
        })
        .catch(console.error);
    },

    addRealDate(id, date) {
      ClientReestrApi.setRealUploadAt({ id: id, date_upload: date })
        .then((res) => {
          this.fetch_not_reload();
          this.makeNotification(
            "Действие",
            "Установлен статус 'дефектный'",
            "success"
          );
        })
        .catch(console.error);
    },
    genName(name) {
      return name + "-add-file";
    },
    genNameInput(name, id) {
      return name + "-add-file-input_" + id;
    },
    getNameUslug(name, id) {
      return name + "-uslug-" + id;
    },
    openLastFile(files) {
      FileAction.open(files[files.length - 1].path);
    },
    showModal(label, files) {
      this.modalFiles.state = true;
      this.modalFiles.files = files;
      this.modalFiles.title = label;
    },
    addFile(field, value) {
      let id_input = this.genNameInput(field.key, value.invoice_id);
      document.getElementById(id_input).click();
    },
    genNameOpen(item) {
      return "button-open-file-" + item;
    },
    sendFiles(item, field) {
      let id_input = this.genNameInput(field.key, item.invoice_id);
      let input = document.getElementById(id_input);
      let files = input.files;
      let form = new FormData();
      if (typeof files != "undefined") {
        form.append("id", item.invoice_id);
        form.append("type", field.key);
        Array.from(files).forEach((file) => form.append("documents[]", file));
        ClientReestrApi.addFiles(form)
          .then(() => {
            this.fetch_not_reload();
            this.makeNotification("Действие", "Файлы добавлены", "success");
          })
          .catch(() => {
            this.makeNotification(
              "Ошибка",
              "Не удалось добавить файлы",
              "danger"
            );
          });
      }
    },
  },

  async mounted() {
    this.fetch();
  },

  watch: {
    filters() {
      this.fetch_not_reload();
    },
    model: {
      handler() {
        this.fetch_not_reload();
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
</style>
