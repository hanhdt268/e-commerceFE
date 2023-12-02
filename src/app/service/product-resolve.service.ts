import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {ProductService} from "./product.service";
import {Product} from '../_model/product.model';
import {ImageProcessingService} from './image-processing.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolveService implements Resolve<Product> {

  constructor(private _product: ProductService, private _imageProcessing: ImageProcessingService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
    const id = route.paramMap.get("pid");
    if (id) {
      //then we have to fetch details from backend

      // @ts-ignore
      return this._product.getProductById(id)

    } else {
      //return empty product observable
      // @ts-ignore
      return of(this.getProductDetails());
    }
  }

  getProductDetails() {
    return {
      title: '',
      description: '',
      config: '',
      price: '',
      discountPrice: '',
      images: '',
      active: true,
      quantum: '',
      imgChildren: [],
      laptopConfig: {
        cpu: '',
        ram: '',
        hardDrive: '',
        screen: '',
        graphic: '',
        connector: '',
        special: '',
        operatingSystem: '',
        design: '',
        sizeMass: '',
        releaseTime: ''
      },
      accessoryConfig: {
        compatible: '',
        resolution: '',
        howToConnect: '',
        wireLength: '',
        typePin: '',
        weight: '',
        brand: '',
        madeIn: '',
        manufacturer: ''
      },
      smartPhoneConfig: {
        screen: '',
        beforeCamera: '',
        afterCamera: '',
        ram: '',
        sim: '',
        chip: '',
        pin: '',
        operatingSystem: '',
        storage: '',
      },
      category: {
        cateId: '',
      },
      manufacturer: {
        manuId: ''
      },
      productEnum: [],
      comment: [
        {
          comId: '',
          content: '',
        }
      ],
      reviews: [
        {
          content: '',
          value: '',
          image: '',
          dateCreate: '',
        }
      ],
    }
  }
}
