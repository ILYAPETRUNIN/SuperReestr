import Api from "@/services/api/BaseApiService";
import { IList } from "@/models/types";

import ClientInvoice, { ClientInvoiceConfig } from "@/models/ClientInvoice";
import { ReestrGetConfig, ReestrOneC, ReestrClose } from "../types";

const clients_name = "/clients_registry";

export default abstract class ClientReestrApi extends Api {
  static addFiles(form: FormData): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiService
        .post(`${clients_name}/add_files`, form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(({ data }) => resolve(data))
        .catch((error) => reject(error));
    });
  }
  static clientSearch(
    params: ReestrGetConfig = {}
  ): Promise<IList<ClientInvoice>> {
    return new Promise((resolve, reject) => {
      this.apiService
        .get(`${clients_name}`, { params })
        .then(({ data: clientList }) =>
          resolve({
            size: clientList.size,
            res: clientList.res.map(
              (cat: ClientInvoiceConfig) => new ClientInvoice(cat)
            ),
          })
        )
        .catch((error) => reject(error));
    });
  }

  static setStatusOneC(params: ReestrOneC): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiService
        .get(`${clients_name}/set_status_one_c`, { params })
        .then((data) => resolve(data))
        .catch((error) => {
          console.log(error);
        });
    });
  }

  static setStatusClose(params: ReestrClose): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiService
        .get(`${clients_name}/set_status_close`, { params })
        .then((data) => resolve(data))
        .catch((error) => {
          console.log(error);
        });
    });
  }
}
