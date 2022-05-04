/* eslint-disable no-debugger, no-console */
// import { AxiosError } from "axios";

// export default class ApiError {
//   private _error: AxiosError;
//   private _output: Array<string> = [];
//   private defaultErrorMessage = "Что-то пошло не так";

//   constructor(error: AxiosError) {
//     this._error = error;
//     this.parse(this._error);
//   }

//   get messages(): Array<string> {
//     return this._output;
//   }

//   private parse(error: AxiosError) {
//     const details = error.response?.data.detail;

//     if (Array.isArray(details)) {
//       details.forEach((item) =>
//         this._output.push(`${item.loc[1]} ${item.msg}!`)
//       );
//     } else if (typeof details === "string") {
//       this._output.push(details);
//     } else {
//       this._output.push(this.defaultErrorMessage);
//     }
//   }
// }
