import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CommentModel} from "../_model/comment.model";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  apiBaseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) {
  }

  public commentProduct(pid: any, comment: CommentModel) {
    return this._http.post(`${this.apiBaseUrl}/comment/${pid}`, comment)
  }

  public getComments() {
    return this._http.get(`${this.apiBaseUrl}/comment/manager-comment`)
  }
}
