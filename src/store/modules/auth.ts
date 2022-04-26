import { ActionTree, Module, MutationTree, GetterTree } from "vuex";

const state = (): any => ({
  token: "",
  refreshToken: "",
  loading: false,
  email: "",
  user: null,
});

const getters: GetterTree<any, any> = {};

const mutations: MutationTree<any> = {};

const actions: ActionTree<any, any> = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
} as Module<any, any>;
