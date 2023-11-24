import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  apiBaseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) {
  }

  public countCart(id: any) {
    return this._http.get(`${this.apiBaseUrl}/cart/count/${id}`)
  }

  public addToCart(pId: any) {
    return this._http.get(`${this.apiBaseUrl}/cart/${pId}`)
  }

  public getCartDetails(userID: any) {
    return this._http.get(`${this.apiBaseUrl}/cart/getCartByUser/${userID}`)
  }

  //delete cart by id
  public deleteCartById(cartId: any) {
    return this._http.delete(`${this.apiBaseUrl}/cart/${cartId}`)
  }

  public updateQuantity(cartId: any, plus: any) {
    return this._http.patch(`${this.apiBaseUrl}/cart/${cartId}/${plus}`, {});
  }

  public getProducts(userId: any, pid: any) {
    return this._http.get(`${this.apiBaseUrl}/product/get/${userId}/${pid}`)
  }
}
