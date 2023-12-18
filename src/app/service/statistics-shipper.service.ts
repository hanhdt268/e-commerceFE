import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StatisticsShipperService {

  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) {
  }

  public getTotal(userId: any) {
    return this._http.get(`${this.apiBaseUrl}/order/totalShipper/${userId}`)
  }

  public getQuantity(userId: any) {
    return this._http.get(`${this.apiBaseUrl}/order/quantityShipper/${userId}`)
  }

  public getDelivering(userId: any) {
    return this._http.get(`${this.apiBaseUrl}/order/deliveringShipper/${userId}`)
  }

  public getDelivered(userId: any) {
    return this._http.get(`${this.apiBaseUrl}/order/deliveredShipper/${userId}`)
  }

}
