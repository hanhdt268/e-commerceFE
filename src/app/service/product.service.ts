import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Product} from '../_model/product.model';
import {ReviewModel} from "../_model/review.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiBaseUrl = environment.apiBaseUrl

  constructor(private _http: HttpClient) {
  }

  public addProduct(product: any) {
    return this._http.post<Product>(`${this.apiBaseUrl}/product/`, product)
  }

  //update product
  public updateProduct(product: any) {
    return this._http.put<Product>(`${this.apiBaseUrl}/product/`, product)
  }

  //get product by id
  public getProductById(pId: any) {
    return this._http.get<Product[]>(`${this.apiBaseUrl}/product/${pId}`)
  }

  //get all
  public getAllProduct() {
    return this._http.get<Product[]>(`${this.apiBaseUrl}/product/`)
  }

  public createRating(pId: any, review: ReviewModel) {
    return this._http.post(`${this.apiBaseUrl}/review/${pId}`, review)
  }

  public getCountStartsByUser(pId: number) {
    return this._http.get(`${this.apiBaseUrl}/review/count/${pId}`)
  }

  public getStars(pId: any) {
    return this._http.get<any[]>(`${this.apiBaseUrl}/review/stars/${pId}`)
  }

  //delete
  public deleteProduct(pId: any) {
    return this._http.delete(`${this.apiBaseUrl}/product/${pId}`)
  }

//get Product of category
  public getProductOfCategory(cId: any, pageNumber: any, searchKey: string = "") {
    return this._http.get(`${this.apiBaseUrl}/product/category/${cId}/?pageNumber=` + pageNumber + "&searchKey=" + searchKey)
  }

  public getProductBySuggest(cId: any, minPrice: any, maxPrice: any, pageNumber: any) {
    return this._http.get(`${this.apiBaseUrl}/product/${cId}/${minPrice}/${maxPrice}/?pageNumber=` + pageNumber)
  }

  public compareProduct(pid: any) {
    return this._http.get(`${this.apiBaseUrl}/product/allProduct/${pid}`)
  }

  public getActiveProduct(pageNumber: any, searchKey: string = "") {
    return this._http.get(`${this.apiBaseUrl}/product/active/?pageNumber=` + pageNumber + "&searchKey=" + searchKey)
  }

  public getProducts(searchKey: string = "") {
    return this._http.get(`${this.apiBaseUrl}/product/all` + "?searchKey=" + searchKey)
  }

  public getProductDetails(isSingleProductCheckOut: any, pId: any) {
    return this._http.get<Product[]>(`${this.apiBaseUrl}/product/${isSingleProductCheckOut}/${pId}`)
  }

  getProductOrderPriceDesc(pageNumber: any, searchKey: any) {
    return this._http.get(`${this.apiBaseUrl}/product/testAPi?pageNumber=` + pageNumber + "&searchKey=" + searchKey)
  }

  getProductOrderPriceAsc(pageNumber: any, searchKey: any) {
    return this._http.get(`${this.apiBaseUrl}/product/acs?pageNumber=` + pageNumber + "&searchKey=" + searchKey)
  }

  getProductByBestSelling(pageNumber: any, searchKey: any) {
    return this._http.get(`${this.apiBaseUrl}/product/selling?pageNumber=` + pageNumber + "&searchKey=" + searchKey)
  }

  getProductByManuAsc(manuId: any) {
    return this._http.get(`${this.apiBaseUrl}/product/manufacturer/asc/${manuId}`)
  }

  getProductByManuDesc(manuId: any) {
    return this._http.get(`${this.apiBaseUrl}/product/manufacturer/desc/${manuId}`)
  }

  getProductByManuSelling(manuId: any) {
    return this._http.get(`${this.apiBaseUrl}/product/manufacturer/selling/${manuId}`)
  }

  getReviews() {
    return this._http.get(`${this.apiBaseUrl}/review/`)
  }

  getReviewById(reId: any) {
    return this._http.get(`${this.apiBaseUrl}/review/${reId}`)
  }

  updateReview(reId: any) {
    return this._http.get(`${this.apiBaseUrl}/review/active/${reId}`)
  }

  inActive(reId: any) {
    return this._http.get(`${this.apiBaseUrl}/review/inActive/${reId}`)
  }
}
