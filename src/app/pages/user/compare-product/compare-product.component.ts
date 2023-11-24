import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../service/product.service";
import {ImageProcessingService} from "../../../service/image-processing.service";
import {Product} from "../../../_model/product.model";

@Component({
  selector: 'app-compare-product',
  templateUrl: './compare-product.component.html',
  styleUrls: ['./compare-product.component.css']
})
export class CompareProductComponent implements OnInit {
  id: any = []
  productDetails: any = []
  product!: Product

  pid: any

  constructor(private _active: ActivatedRoute,
              private _product: ProductService,
              private _createImage: ImageProcessingService,
              private _router: Router) {
  }

  ngOnInit(): void {
    const ins = this.id.join(',')
    this.pid = this._active.snapshot.params['pid']
    const productId = this._active.snapshot.params['productId']
    this.id.push(this.pid, productId)
    console.log(this.id)
    this.getProductCompare();
    this.getProductById();
  }

  public getProductCompare() {
    this._product.compareProduct(this.id).subscribe({
      next: (resp: any) => {
        console.log(resp)
        this.productDetails = resp


      }
    })
  }

  public getProductById() {
    this._product.getProductById(this.pid).subscribe({
      next: (resp) => {
        console.log(resp)
        // @ts-ignore
        this.product = resp
      }
    })
  }

  handlerNavigate(pid: number) {
    this._router.navigate(['productViewDetails', {pid: pid}])
  }
}
