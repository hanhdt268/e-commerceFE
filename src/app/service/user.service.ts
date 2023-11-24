import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiBaseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) {
  }

  public updateUser(user: any): Observable<any> {
    return this._http.put(`${this.apiBaseUrl}/user/`, user)
  }

  //add user
  public addUser(user: any): Observable<any> {
    return this._http.post(`${this.apiBaseUrl}/user/`, user)
  }

  public changeAvatar(user: any) {
    return this._http.put(`${this.apiBaseUrl}/user/avatar`, user)
  }

  public getAllUser() {
    return this._http.get(`${this.apiBaseUrl}/user/getAllUser`)
  }

  public lockAccount(userId: any) {
    return this._http.get(`${this.apiBaseUrl}/user/lockAccount/${userId}`)
  }

  public unLockAccount(userId: any) {
    return this._http.get(`${this.apiBaseUrl}/user/unLockAccount/${userId}`)
  }

  public forgetPassword(email: any) {
    return this._http.post(`${this.apiBaseUrl}/user/forgetPassword/`, email)
  }

  public resetPassword(user: any, token: any) {
    return this._http.post(`${this.apiBaseUrl}/user/reset-password/${token}`, user)
  }
}
