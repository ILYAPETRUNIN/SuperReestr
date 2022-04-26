import Vue from "vue";
import Vuex, { StoreOptions, MutationTree, GetterTree, ActionTree } from "vuex";
import ApiError from "@/services/helpers/ApiError";

// modules
import auth from "./modules/auth";

Vue.use(Vuex);

/**
 * STATE
 */
const state = (): any => ({});

/**
 * MUTATIONS
 */
const mutations: MutationTree<any> = {};

/**
 * GETTERS
 */
const getters: GetterTree<any, any> = {};

/**
 * ACTIONS
 */
const actions: ActionTree<any, any> = {};

export default new Vuex.Store<any>({
  state,
  mutations,
  getters,
  actions,
  modules: {
    auth,
  },
} as StoreOptions<any>);
