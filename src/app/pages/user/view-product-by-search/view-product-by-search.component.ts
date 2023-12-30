import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../service/product.service";
import {ImageProcessingService} from "../../../service/image-processing.service";
import Swal from "sweetalert2";
import {ManufacturerService} from "../../../service/manufacturer.service";

const transformArray = function (array: Array<any>, field: any) {
  if (array) {
    const groupedObj = array.reduce((prev, cur) => {
      if (!prev[cur[field]]) {
        prev[cur[field]] = [cur];
      } else {
        prev[cur[field]].push(cur);
      }
      return prev;
    }, {});
    return Object.keys(groupedObj).map(key => ({key, value: groupedObj[key][0]}));
  }
  return [];
}

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
  manufacturer: any = []
  manu: any = []

  manuId: any
  page: number = 0;
  count: number = 0;
  tableSize: number = 8;
  tableSizes: any = [3, 6, 9, 12];
  pageNum: number = 0

  constructor(private _active: ActivatedRoute, private _product: ProductService,
              private _imageProcessing: ImageProcessingService,
              private _router: Router,
              private _manufacture: ManufacturerService) {
  }

  ngOnInit(): void {
    this._active.params.subscribe(params => {
      // @ts-ignore
      this.search = params.search;
      // @ts-ignore
      this.manuId = params.manuId
      // if (this.search == "") {
      //   this.getAllProduct()
      // } else {
      //   this.getAllProduct(this.search);
      // }
      if (this.search !== null) {
        if (this.manuId == 0) {
          this.getAllProduct(this.search)
        } else {
          this.handlerView(this.manuId)
        }
      }
    })

  }

  public getAllProduct(searchKey: string = "") {
    this._product.getActiveProduct(this.pageNumber, searchKey)
      .subscribe({
        // @ts-ignore
        next: (data: any[]) => {
          this.productDetails = data.reverse()
          // this.productDetails = data
          // console.log(this.productDetails)
          for (const newDatum of data) {
            this.manu.push(newDatum.manufacturer)
          }
          // console.log(this.manu)
          this.manufacturer = transformArray(this.manu, 'title')

          console.log(this.manufacturer)
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
        // console.log(resp)
        this.productDetails = resp
      }
    })
  }

  handlePriceAsc() {
    this._product.getProductOrderPriceAsc(this.pageNumber, this.search).subscribe({
      next: (resp: any) => {
        console.log(resp)
        this.productDetails = resp
      }
    })
  }

  handleProductByBestSelling() {
    this._product.getProductByBestSelling(this.pageNumber, this.search).subscribe({
      next: (resp) => {
        // console.log(resp)
        this.productDetails = resp

      }
    })
  }

  getProductByManuAsc(manuId: any) {
    this._product.getProductByManuAsc(manuId).subscribe({
      next: (resp: any) => {
        this.productDetails = resp
      }
    })
  }

  getProductByManuDesc(manuId: any) {
    this._product.getProductByManuDesc(manuId).subscribe({
      next: (resp: any) => {
        this.productDetails = resp
      }
    })
  }

  getProductByManuSelling(manuId: any) {
    this._product.getProductByManuSelling(manuId).subscribe({
      next: (resp: any) => {
        this.productDetails = resp
      }
    })
  }

  setValue(i: any) {
    console.log(i)
    if (this.manuId == 0) {
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
    } else {
      if (i == 0) {
        this.getProductByManuDesc(this.manuId)
      } else if (i == 1) {
        this.getProductByManuAsc(this.manuId)
      } else {
        this.getProductByManuSelling(this.manuId)
      }
    }

  }

  handlerView(manuId: any) {
    this._manufacture.getProductByManufacturer(manuId, 0, "").subscribe({
      next: (resp: any) => {
        // console.log(resp)
        this.productDetails = resp.reverse()
      }
    })
  }

  demo(i: number) {
    var bntContainer = document.getElementById("parentManu")
    // @ts-ignore
    var bnt = bntContainer.getElementsByClassName("btn")
    console.log(bnt)
    for (let i = 0; i < bnt.length; i++) {
      bnt[i].addEventListener('click', function () {
        var current = document.getElementsByClassName("manu")
        console.log(current)
        // @ts-ignore
        current[0].className = current[0].className.replace(" manu")
        // @ts-ignore
        this.className += " manu"
      })

    }
  }

  onTableDataChange(event: any) {
    this.pageNumber = event;
    this.getAllProduct(this.search);
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.pageNum = 1;
    this.getAllProduct();
  }
}
