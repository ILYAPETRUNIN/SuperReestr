import axios from "axios";
import qs from "qs";
import router from "@/router/index";
import store from "@/store/index";
import ApiError from "@/services/helpers/ApiError";

export default abstract class Api {
  static getAccessToken() {
    const vuex = window.localStorage.getItem("tokens");
    return vuex ? JSON.parse(vuex).auth?.token : "";
  }

  static getRefreshToken() {
    const vuex = window.localStorage.getItem("tokens");
    return vuex ? JSON.parse(vuex).auth?.refreshToken : "";
  }

  static apiService = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_PATH,
    // withCredentials : true,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.getAccessToken(),
    },
    paramsSerializer: (params) =>
      qs.stringify(params, { skipNulls: true, arrayFormat: "comma" }),
  });
}

// Api.apiService.interceptors.response.use(
//   function(response) {
//     return response;
//   },
//   function(error) {
//     if (error.response?.status === 401) {
//       if(Api.getRefreshToken()){
//         store.dispatch("auth/refresh")
//         .catch((e)=>router.push("/login-step-1"))
//       }
//       else router.push("/login-step-1")
//     }
//     else if (error.response?.status === 403) {
//       router.push("/login-step-1");
//     }

//     //store.dispatch("showApiError", new ApiError(error));

//     return Promise.reject(error);
//   }
// );
