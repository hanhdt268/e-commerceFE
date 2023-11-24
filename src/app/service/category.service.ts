import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../_model/category.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiBaseUrl = environment.apiBaseUrl

  constructor(private _http: HttpClient) { }
  public addCategory(category: Category) {
    return this._http.post<Category>(`${this.apiBaseUrl}/category/`, category)

  }

  //update category
  public updateCategory(category: Category) {
    return this._http.put<Category>(`${this.apiBaseUrl}/category/`, category)
  }

  //get category by id
  public getCategories(cId: any) {
    return this._http.get(`${this.apiBaseUrl}/category/${cId}`)
  }

  //get all
  public categories() {
    return this._http.get<any[]>(`${this.apiBaseUrl}/category/`)
  }

  //delete
  public deleteCategory(cId: any) {
    return this._http.delete(`${this.apiBaseUrl}/category/${cId}`)
  }
}
