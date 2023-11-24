import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginService} from "./login.service";
import {Injectable} from "@angular/core";




@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(private _login: LoginService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //add the jwt token (localstorage) request
    let authReq =req;
    const token = this._login.getToken();
    console.log("inside interceptor")
    if (token != null){
        authReq= authReq.clone({setHeaders:{Authorization: `Bearer ${token}`}})
    }
    return next.handle(authReq);

  }

}

export const authInterceptorProvides=[
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi : true
  }
]
