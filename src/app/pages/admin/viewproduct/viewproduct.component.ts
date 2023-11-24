import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from 'src/app/_model/product.model';
import {CategoryService} from 'src/app/service/category.service';
import {ImageProcessingService} from 'src/app/service/image-processing.service';
import {ProductService} from 'src/app/service/product.service';
import Swal from 'sweetalert2';
import {map} from "rxjs";
import {ProductEnum} from "../../../_model/productEnum";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {
  showLoadMoreProduct = false;
  showTable = false;
  pageNumber: number = 0;
  dataSource: any = []
  productDetails: Product[] = []
  @ViewChild(MatSort) sort!: MatSort;
  category: any
  cateId: any
  displayedColumns: string[] = ['Id', 'Product Image', 'Product Name', 'Product ActualPrice', 'Product DiscountPrice', 'Actions'];
  @ViewChild('paginator') paginator!: MatPaginator
  page: number = 0;
  count: number = 0;
  tableSize: number = 8;
  tableSizes: any = [3, 6, 9, 12];

  constructor(private _product: ProductService, private _imagesDialog: MatDialog, private _imageProcessing: ImageProcessingService,
              private _route: Router, private _category: CategoryService,
              private _snack: MatSnackBar,
              private _activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this._activeRoute.params.subscribe((params) => {
      // @ts-ignore
      this.cateId = params.cateId
      if (this.cateId == 0) {
        console.log("load All product")
        this.getAllProduct();
      } else {
        console.log("load product by category")
        this.getProductByCategory();
      }
    })

    this._category.categories().subscribe({
      next: (data: any) => {
        this.category = data
      },
      error: (error: any) => {
        this._snack.open('Error loading database', '', {
          duration: 3000
        })
        console.log(error)
      }
    })
  }

  public getProductByCategory(searchKey: string = "") {
    this._product.getProductOfCategory(this.cateId, this.pageNumber)
      .pipe(
        // @ts-ignore
        map((x: Product[], i) => x.map((product: Product) => this._imageProcessing.createImages(product)))
      )
      .subscribe({
        // @ts-ignore
        next: (data: Product[]) => {
          console.log(data);
          this.productDetails = data;
          // this.dataSource = new MatTableDataSource(data);
          // this.dataSource.paginator = this.paginator;
          // this.dataSource.sort = this.sort;
        },

      })
  }

  public getAllProduct(searchKey: string = "") {
    this._product.getProducts(searchKey)

      .subscribe({
        // @ts-ignore

        next: (data: Product[]) => {
          // console.log(data);
          this.productDetails = data
          console.log(this.productDetails)
          // this.dataSource = new MatTableDataSource(data);
          // this.dataSource.paginator = this.paginator;
          // this.dataSource.sort = this.sort;
          if (data.length == 8) {
            this.showLoadMoreProduct = true;
          } else {
            this.showLoadMoreProduct = false;
          }
        },
        error: (error: any) => {
          console.log(error);
          Swal.fire('Error', 'Error in loading data', 'error')
        }
      })
  }


  delete(pId: any) {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure?',
      confirmButtonText: 'Delete',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this._product.deleteProduct(pId).subscribe({
          next: (data: any) => {
            this.productDetails = this.productDetails.filter((product: any) => product.pId != pId)
            Swal.fire('Successfully', 'Product deleted', 'success')
          },
          error: (error) => {
            Swal.fire('Error', 'Error in deleting product', 'error')

          }
        })
      }
    })
  }

  // openImages(product: Product) {
  //   console.log(product);
  //   this._imagesDialog.open(ShowProductImagesDialogComponent, {
  //     data: {
  //       images: product.productImages
  //     },
  //     height: '500px',
  //     width: '800px',
  //   })
  // }
  onTableDataChange(event: any) {
    this.pageNumber = event;
    this.getAllProduct();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.pageNumber = 1;
    this.getAllProduct();
  }

  editProductDetails(pid: any) {

    switch (String(ProductEnum.LAPTOP || ProductEnum.ACCESSORY || ProductEnum.SMARTPHONE)) {
      case "LAPTOP": {
        this._route.navigate(['/admin/add-product', {pid: pid}])
        break
      }
      case "ACCESSORY": {
        this._route.navigate(['/admin/add-accessory', {pid: pid}])
        break
      }
      case "SMARTPHONE": {
        this._route.navigate(['/admin/add-smartphone', {pid: pid}])
        break
      }
      default: {
        throw new Error("error")
      }
    }

  }

  loadMoreProduct() {
    this.pageNumber = this.pageNumber + 1;
    this.getAllProduct();
  }

  searchByKeyword(searchKeyword: any) {
    console.log(searchKeyword);
    this.pageNumber = 0;
    this.productDetails = [];
    this.getAllProduct(searchKeyword);
  }

  previous() {
    this.pageNumber = this.pageNumber - 1;
    this.getAllProduct();
  }
}
