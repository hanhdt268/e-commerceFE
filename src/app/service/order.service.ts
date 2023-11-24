import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {OderDetails} from "../_model/order-details.model";
import {Observable} from "rxjs";
import {MyOrderDetails} from "../_model/order.model";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiBaseUrl = environment.apiBaseUrl

  constructor(private _http: HttpClient) {
  }


  public placeOder(oderDetails: OderDetails, isCartCheckout: any) {
    return this._http.post(`${this.apiBaseUrl}/order/${isCartCheckout}`, oderDetails)
  }

  public placeOder1(oderDetails: OderDetails, userId: any, cartId: any, isCartCheckout: any) {
    return this._http.post(`${this.apiBaseUrl}/order/od/${userId}/${cartId}/${isCartCheckout}`, oderDetails)
  }

  public getOrderDetails(id: any, status: any): Observable<MyOrderDetails[]> {
    return this._http.get<MyOrderDetails[]>(`${this.apiBaseUrl}/order/${id}/${status}`)
  }

  public getAllOderDetails(status: any): Observable<MyOrderDetails[]> {
    return this._http.get<MyOrderDetails[]>(`${this.apiBaseUrl}/order/getAllOrderDetails/${status}`)
  }

  public getOrderForShipper(userId: any, status: any) {
    return this._http.get(`${this.apiBaseUrl}/order/shipper/${userId}/${status}`)
  }

  public getShipper() {
    return this._http.get(`${this.apiBaseUrl}/order/user`)
  }

  public createShip(orderId: any, userId: any) {
    return this._http.get(`${this.apiBaseUrl}/order/insert/${orderId}/${userId}`)
  }

  public getAllOderDetailsForShipper(status: any): Observable<MyOrderDetails[]> {
    return this._http.get<MyOrderDetails[]>(`${this.apiBaseUrl}/order/getOrder/${status}`)
  }

  public getOrderById(orderId: any) {
    return this._http.get(`${this.apiBaseUrl}/order/${orderId}`)
  }

  getAmountByMonth() {
    return this._http.get<any[]>(`${this.apiBaseUrl}/order/amountMonth`)
  }

  getPresentCategory() {
    return this._http.get<any[]>(`${this.apiBaseUrl}/order/presentCategory`)
  }

  public getTotalAmount() {
    return this._http.get(`${this.apiBaseUrl}/order/total`)
  }

  public getTotalQuantity() {
    return this._http.get(`${this.apiBaseUrl}/order/quantity`)
  }

  public getTotalDelivered() {
    return this._http.get(`${this.apiBaseUrl}/order/totalDelivered`)
  }

  //get status
  public getStatusOrder(status: string) {
    return this._http.get(`${this.apiBaseUrl}/order/status/${status}`)
  }

  public markOrderAsConfirm(orderId: any) {
    return this._http.get(`${this.apiBaseUrl}/order/confirm/${orderId}`)
  }

  public markOrderAsDestroy(orderId: any) {
    return this._http.get(`${this.apiBaseUrl}/order/cancel/${orderId}`)
  }

  public markOrderAsDelivering(orderId: any) {
    return this._http.get(`${this.apiBaseUrl}/order/delivering/${orderId}`)
  }

  public markOrderAsDelivered(orderId: any) {
    return this._http.get(`${this.apiBaseUrl}/order/delivered/${orderId}`)
  }

  public markOrderAsReceived(orderId: any) {
    return this._http.get(`${this.apiBaseUrl}/order/receive/${orderId}`)
  }

  public markOrderAsReviewsProduct(oder: any) {
    return this._http.get(`${this.apiBaseUrl}/order/markOrderAsReviewsProduct/${oder}`)
  }
}
