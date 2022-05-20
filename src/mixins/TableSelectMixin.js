export default {
  data: function () {
    return {
      selected: [],
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
    selectRow(item) {
      this.selected.push(item);
    },
    unselectRow(index) {
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
    initTable() {
      this.items.forEach((el, index) => {
        if (this.selected.find((selEl) => el.id == selEl.id)) {
          this.$refs.selectableTable.selectRow(index);
        }
      });
    },
  },
};
