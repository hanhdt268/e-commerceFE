import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {

  private apiBaseUrl = environment.apiBaseUrl

  constructor(private _http: HttpClient) {
  }

  public updateSelected(manuId: any) {
    return this._http.get(`${this.apiBaseUrl}/manufacturer/selected/${manuId}`)
  }

  public updateSelect(manuId: any) {
    return this._http.get(`${this.apiBaseUrl}/manufacturer/select/${manuId}`)
  }

  public addManufacturer(manufacturer: any) {
    return this._http.post(`${this.apiBaseUrl}/manufacturer/`, manufacturer);
  }

  public getProductByManufacturer(mId: any, pageNumber: any, searchKey: any) {
    return this._http.get(`${this.apiBaseUrl}/product/manufacturer/${mId}` + "?pageNumber=" + pageNumber + "&searchKey=" + searchKey)
  }

  public getManufacturerByCategory(cId: any) {
    return this._http.get(`${this.apiBaseUrl}/manufacturer/category/${cId}`)
  }

  public getManufacturerById(mId: any) {
    return this._http.get(`${this.apiBaseUrl}/manufacturer/${mId}`)
  }

  public getAllManufacturer() {
    return this._http.get<any[]>(`${this.apiBaseUrl}/manufacturer/`)
  }

  public deleteManufacturer(manuId: any) {
    return this._http.delete(`${this.apiBaseUrl}/manufacturer/${manuId}`)
  }

  public updateManufacturer(manufacturer: any) {
    return this._http.put(`${this.apiBaseUrl}/manufacturer/`, manufacturer)
  }

  public deleteAllId(manuId: any) {
    return this._http.delete(`${this.apiBaseUrl}/manufacturer/delete/${manuId}`)


  }
}
