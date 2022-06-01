import Api from "@/services/api/BaseApiService";
import { IList } from "@/models/types";
import { CommentCreate } from "@/models//Deal";

import Deal, { DealConfig } from "@/models/Deal";
import StatusPayment, { StatusPaymentConfig } from "@/models/StatusPayment";
import Company, { CompanyConfig } from "@/models/Company";
import {
  ReestrGetConfig,
  ChangeDatePaymentConfig,
  SetPaymentConfig,
  ChangePaymentConfig,
} from "../types";

const name = "/payment_registry";
export default abstract class ReestrApi extends Api {
  static getList(params: ReestrGetConfig = {}): Promise<IList<Deal>> {
    return new Promise((resolve, reject) => {
      this.apiService
        .get(`${name}/search.json`, { params })
        .then(({ data: catList }) =>
          resolve({
            size: catList.size,
            res: catList.res.map((cat: DealConfig) => new Deal(cat)),
          })
        )
        .catch((error) => reject(error));
    });
  }

  static changeDatePayment(params: ChangeDatePaymentConfig): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiService
        .get(`${name}/date_update`, { params })
        .then(({ data }) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  static getCompanies(): Promise<Array<Company>> {
    return new Promise((resolve, reject) => {
      this.apiService
        .get(`${name}/get_company`)
        .then(({ data: catList }) =>
          resolve(catList.map((cat: CompanyConfig) => new Company(cat)))
        )
        .catch((error) => reject(error));
    });
  }

  static sendToPayment(row: Array<number>): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiService
        .post(`${name}/send_to_payment`, { row })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  static getStatusPaymentList(): Promise<Array<StatusPayment>> {
    return new Promise((resolve, reject) => {
      this.apiService
        .get(`${name}/status_payment_list`)
        .then(({ data: catList }) =>
          resolve(
            catList.map((cat: StatusPaymentConfig) => new StatusPayment(cat))
          )
        )
        .catch((error) => reject(error));
    });
  }

  static setStatusPayment(params: SetPaymentConfig): Promise<Deal> {
    return new Promise((resolve, reject) => {
      this.apiService
        .get(`${name}/status_payment_set`, { params })
        .then(({ data }) => resolve(new Deal(data)))
        .catch((error) => reject(error));
    });
  }

  static changePayment(params: ChangePaymentConfig): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiService
        .get(`${name}/change_payment`, { params })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  static createPayment(form: FormData, type: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiService
        .post(`${name}/${type}`, form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(({ data }) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  static createComment(data: CommentCreate): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiService
        .post(`${name}/messages`, { ...data })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }
}
