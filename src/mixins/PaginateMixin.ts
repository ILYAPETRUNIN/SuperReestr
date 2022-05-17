import Vue from "vue";

interface IData {
  limit: number;
  offset: number;
  totalItems: number | null;
  page: number;
}

interface IComputed {
  filters: Filters;
  numberPages: number;
}

interface IMethods {
  paginate: (options: IPaginate) => void;
}

interface Filters {
  offset: number;
  limit: number;
}

interface IPaginate {
  page: number;
  itemsPerPage: number;
}

export default Vue.extend<IData, IMethods, IComputed>({
  data: function () {
    return {
      limit: 5,
      offset: 0,
      totalItems: null,
      page: 1,
    };
  },

  computed: {
    filters() {
      return {
        limit: this.limit,
        offset: this.offset,
      };
    },

    numberPages() {
      if (this.totalItems) return Math.trunc(this.totalItems / this.limit + 1);
      return 0;
    },
  },

  methods: {
    paginate(options) {
      const { page, itemsPerPage: limit } = options;
      const offset = (page - 1) * limit;

      this.limit = limit;
      this.offset = offset;
    },
  },
  watch: {
    page(val) {
      this.paginate({ itemsPerPage: this.filters.limit, page: val });
    },
    limit(val) {
      this.paginate({ itemsPerPage: val, page: 1 });
    },
  },
});
