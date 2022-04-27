/* eslint-disable no-debugger, no-console */
import axios from "axios";
import qs from "qs";

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
//   function (response) {
//     return response;
//   },
//   function (error) {
//     if (error.response?.status === 401) {
//     } else if (error.response?.status === 403) {
//     }

//     return Promise.reject(error);
//   }
// );
