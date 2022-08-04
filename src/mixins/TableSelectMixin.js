export default {
  data: function () {
    return {
      selected: [],
      summamount: 0,
    };
  },

  methods: {
    selectAllRows() {
      this.$refs.selectableTable.selectAllRows();
      this.items.forEach((el) => {
        const indexInArray = this.selected.findIndex(
          (selEl) => el.id == selEl.id
        );
        if (indexInArray == -1) this.selectRow(el);
      });
    },
    clearSelected() {
      this.$refs.selectableTable.clearSelected();
      this.items.forEach((el) => {
        const indexInArray = this.selected.findIndex(
          (selEl) => el.id == selEl.id
        );
        if (indexInArray != -1) this.unselectRow(indexInArray);
      });
    },
    getSumm() {
      return this.summamount;
    },
    selectRow(item) {
      this.selected.push(item);
      this.selectSummAmount(item);
    },
    unselectRow(index) {
      const item_select = this.selected[index];
      this.unselectSummAmount(item_select);
      this.selected.splice(index, 1);
    },
    toogleRow(item, index) {
      const indexInArray = this.selected.findIndex((el) => el.id == item.id);
      if (indexInArray != -1) this.unselectRow(indexInArray);
      else this.selectRow(item);
    },
    toogleAll(state) {
      if (state) this.selectAllRows();
      else this.clearSelected();
    },
    selectSummAmount(item) {
      if (item.summ_amount == null) {
        this.summamount += item.pre_amount;
      } else {
        this.summamount += item.summ_amount;
      }
    },
    unselectSummAmount(item) {
      if (item.summ_amount == null) {
        this.summamount -= item.pre_amount;
      } else {
        this.summamount -= item.summ_amount;
      }
    },
    initTable() {
      this.items.forEach((el, index) => {
        if (this.selected.find((selEl) => el.id == selEl.id)) {
          this.$refs.selectableTable.selectRow(index);
        }
      });
    },
  },
};
