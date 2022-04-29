import Vue from "vue";

interface IData {
  toastCount: number;
}

interface IComputed {}  // eslint-disable-line

interface IMethods {
  makeNotification: (title: string, text: string, variant: string) => void;
}

export default Vue.extend<IData, IComputed, IMethods>({
  data: function () {
    return {
      toastCount: 0,
    };
  },

  methods: {
    makeNotification(title: string, message: string, variant: string) {
      this.toastCount++;
      this.$bvToast.toast(message, {
        title,
        variant,
        autoHideDelay: 1000,
        appendToast: true,
      });
    },
  },
});
