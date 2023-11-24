import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {map, Observable} from "rxjs";
import {ProductService} from "./product.service";
import {ImageProcessingService} from "./image-processing.service";
import {Product} from "../_model/product.model";

@Injectable({
  providedIn: 'root'
})
export class BuyProductResolverServiceService implements Resolve<Product[]>{

  constructor(private _productService: ProductService,
              private imageProcessingService: ImageProcessingService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product[]> | Promise<Product[]> | Product[] {
    const id = route.paramMap.get("id");
    const isSingleProductCheckOut = route.paramMap.get("isSingleProductCheckOut")
    // @ts-ignore
    return this._productService.getProductDetails(isSingleProductCheckOut, id)
      .pipe(
        map(
          (x: Product[], i)=> x.map((product:Product)=>this.imageProcessingService.createImages(product))
        )
      )
  }
}
