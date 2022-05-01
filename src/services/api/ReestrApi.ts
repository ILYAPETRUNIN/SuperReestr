import Api from "@/services/api/BaseApiService";
import { IList } from "@/models/types";

import Deal, { DealConfig } from "@/models/Deal";

const name = "/payment_registry";
export default abstract class ReestrApi extends Api {
  static getList(params: object = {}): Promise<IList<Deal>> {
    return new Promise((resolve, reject) => {
      this.apiService
        .get(`${name}/get.json`, { params })
        .then(({ data: catList }) =>
          resolve({
            size: catList.size,
            res: catList.res.map((cat: DealConfig) => new Deal(cat)),
          })
        )
        .catch((error) => reject(error));
    });
  }

  static search(params: object = {}): Promise<IList<Deal>> {
    return new Promise((resolve, reject) => {
      this.apiService
        .get(`${name}/search.json`, { params })
        .then(({ data: catList }) =>
          resolve({
            size: catList.size,
            res: catList.data.map((cat: DealConfig) => new Deal(cat)),
          })
        )
        .catch((error) => reject(error));
    });
  }

  static dateSearch(params: object = {}): Promise<IList<Deal>> {
    return new Promise((resolve, reject) => {
      this.apiService
        .get(`${name}/date_search`, { params })
        .then(({ data: catList }) =>
          resolve({
            size: catList.size,
            res: catList.data.map((cat: DealConfig) => new Deal(cat)),
          })
        )
        .catch((error) => reject(error));
    });
  }

  // static get(id: routerId): Promise<BaseBankingProduct> {
  //   return new Promise((resolve, reject) => {
  //     this.apiService
  //       .get(`/directories/products/${id}`)
  //       .then(response => resolve(new BaseBankingProduct(response.data)))
  //       .catch(error => reject(error));
  //   });
  // }

  // static create(body: CreateBankingProductConfig): Promise<BaseBankingProduct> {
  //   return new Promise((resolve, reject) => {
  //     this.apiService
  //       .post("/directories/products", body)
  //       .then(response => resolve(new BaseBankingProduct(response.data)))
  //       .catch(error => reject(error));
  //   });
  // }

  // static update(id: routerId,body: CreateBankingProductConfig): Promise<BaseBankingProduct> {
  //   return new Promise((resolve, reject) => {
  //     this.apiService
  //       .patch(`/directories/products/${id}`, body)
  //       .then(response => resolve(new BaseBankingProduct(response.data)))
  //       .catch(error => reject(error));
  //   });
  // }

  // static delete(id: routerId): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     this.apiService
  //       .delete(`/directories/products/${id}`)
  //       .then(response => resolve(response))
  //       .catch(error => reject(error));
  //   });
  // }
}
