import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../service/product.service";
import {ImageProcessingService} from "../../../service/image-processing.service";
import Swal from "sweetalert2";
import {Product} from "../../../_model/product.model";
import {map} from "rxjs";

@Component({
  selector: 'app-view-product-by-search',
  templateUrl: './view-product-by-search.component.html',
  styleUrls: ['./view-product-by-search.component.css']
})
export class ViewProductBySearchComponent implements OnInit {
  @Input() search: any
  pageNumber: number = 0;
  productDetails: any = [];

  showLoadMoreProduct!: boolean;

  showProduct: boolean = false;

  selectedValue!: string;
  options: any[] = [
    {value: '0', viewValue: "Giá cao đến thấp",},
    {value: '1', viewValue: "Giá thấp đến cao"},
    {value: '2', viewValue: "Lượt bán nhiều nhất"},
  ];

  constructor(private _active: ActivatedRoute, private _product: ProductService,
              private _imageProcessing: ImageProcessingService,
              private _router: Router) {
  }

  ngOnInit(): void {
    this._active.params.subscribe(params => {
      // @ts-ignore
      this.search = params.search;

      if (this.search == "") {
        this.getAllProduct()
      } else {
        this.getAllProduct(this.search);
      }
    })
  }

  public getAllProduct(searchKey: string = "") {
    this._product.getActiveProduct(this.pageNumber, searchKey)
      .pipe(
        // @ts-ignore
        map((x: Product[], i) => x.map((product: Product) => this._imageProcessing.createImages(product)))
      )
      .subscribe({
        // @ts-ignore
        next: (data: Product[]) => {
          data.forEach((p: any) => this.productDetails.push(p))
          // this.productDetails = data
          // console.log(this.productDetails)
          this.showProduct = true;
          if (data.length == 8) {
            this.showLoadMoreProduct = true
          } else {
            this.showLoadMoreProduct = false
          }

        },
        error: (error) => {
          console.log(error);
          Swal.fire('Error', 'Error in loading data', 'error')
        }
      })
  }

  showProductDetails(pid: any) {
    this._router.navigate(['productViewDetails', {pid: pid}])
  }

  loadMoreProduct(i: any) {
    if (i == 0) {
      this.pageNumber = this.pageNumber + 1;

      this.handlePriceDesc()
    } else if (i == 1) {
      this.pageNumber = this.pageNumber + 1;

      this.handlePriceAsc()
    } else if (i == 2) {
      this.pageNumber = this.pageNumber + 1;

      this.handleProductByBestSelling()
    } else {
      this.pageNumber = this.pageNumber + 1;

      this.getAllProduct(this.search)

    }

  }

  handlePriceDesc() {
    this._product.getProductOrderPriceDesc(this.pageNumber, this.search).subscribe({
      next: (resp) => {
        console.log(resp)
        this.productDetails = resp
      }
    })
  }

  handlePriceAsc() {
    this._product.getProductOrderPriceAsc(this.pageNumber, this.search).subscribe({
      next: (resp) => {
        console.log(resp)
        this.productDetails = resp
      }
    })
  }

  handleProductByBestSelling() {
    this._product.getProductByBestSelling(this.pageNumber, this.search).subscribe({
      next: (resp) => {
        console.log(resp)
        this.productDetails = resp

      }
    })
  }

  setValue(i: any) {
    console.log(i)
    if (i == 0) {
      this.pageNumber = 0;
      this.handlePriceDesc()
    } else if (i == 1) {
      this.pageNumber = 0;

      this.handlePriceAsc()
    } else {
      this.pageNumber = 0;
      
      this.handleProductByBestSelling()
    }

  }
}
