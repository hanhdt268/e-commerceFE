import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../_model/product.model";
import {ProductService} from "../../../service/product.service";
import {ImageProcessingService} from "../../../service/image-processing.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ManufacturerService} from "../../../service/manufacturer.service";
import {OrderService} from "../../../service/order.service";
import {LoginService} from "../../../service/login.service";
import Swal from "sweetalert2";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  product: Product[] = []
  pageNumber = 0;
  cateId: any;
  showLoadMoreProduct = false;
  next = false;
  manuId: any
  manufacturers: any = []
  stars = [1, 2, 3, 4, 5];
  pId: any;
  isShow: boolean = true;
  @Input() shopping: any = 0;

  productDetails: Product[] = [];
  productDetails1: any = [];
  dataProductDetails: any = [];
  valueInput: string = ''
  test: any = [];
  user: any
  slideIndex = 0;
  percentage: any = [];
  dataProductByPriceDesc: any = []
  clicked: boolean = true;

  page: number = 0;
  count: number = 0;
  tableSize: number = 8;
  tableSizes: any = [3, 6, 9, 12];

  constructor(private _product: ProductService,
              private _imageProcessing: ImageProcessingService,
              private _route: ActivatedRoute,
              private _router: Router,
              private _manufacturer: ManufacturerService,
              private _order: OrderService,
              private _login: LoginService) {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.user = this._login.getUser()
    this.product = this._route.snapshot.data['product']
    this._route.params.subscribe((params) => {
      // @ts-ignore
      this.cId = params.cId;
      // @ts-ignore
      this.manuId = params.manuId;
      if (this.manuId == 0) {
        console.log("Manufacturer")
        this.getAllProduct();
      } else {
        this.getProductByManufacturer();
        console.log("load specific")
      }
    })
    this.showSlides()
  }

  showSlides() {
    let i = 0;
    let slides: any = document.getElementsByClassName("slider");
    let dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    this.slideIndex++;
    if (this.slideIndex > slides.length) {
      this.slideIndex = 1;
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[this.slideIndex - 1].style.display = "block";
    dots[this.slideIndex - 1].className += " active";
    const timeOut = setTimeout(() => {
      this.showSlides()
    }, 2000)
  }

  public getAllProduct(searchKey: string = "") {
    this._product.getAllProduct()
      .subscribe({
        // @ts-ignore
        next: (data: Product[]) => {
          this.productDetails = data.reverse()

          // const test = this.productDetails.map((re: any) => re.reviews).reduce((acc: any, cur: any) =>
          //   acc + cur.length, 0)
          // console.log(test)


          this.showLoadMoreProduct = data.length == 8;

        },
        error: (error) => {
          console.log(error);
          Swal.fire('Error', 'Error in loading data', 'error')
        }
      })
  }

  public getProductByManufacturer(searchKey: string = "") {
    this._manufacturer.getProductByManufacturer(this.manuId, this.pageNumber, searchKey)

      .subscribe({
        // @ts-ignore
        next: (data: Product[]) => {
          this.productDetails = data.reverse();
          this.dataProductDetails = this.productDetails;
        },
        error: (error) => {
          console.log(error)
        }
      })
  }

  showProductDetails(pid: any) {
    this._router.navigate(['productViewDetails', {pid: pid}])
  }

  public loadMoreProduct() {
    this.pageNumber = this.pageNumber + 1;
    this.getAllProduct();

  }

  previous() {
    this.pageNumber = this.pageNumber - 1;
    this.getAllProduct()
  }

  handlePriceDesc() {

  }

  handlePriceAsc() {

  }

  handleProductByBestSelling() {

  }

  onTableDataChange(event: any) {
    this.pageNumber = event;
    this.getAllProduct();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.pageNumber = 1;
    this.getAllProduct();
  }

  getCalculatedReview(value: any) {
    // console.log(this.productDetails)
    // let total = 0;
    // let product = []
    // for (let i = 0; i < this.productDetails.length; i++) {
    //   product = this.productDetails[i].reviews
    //   for (let j = 0; j < product.length; j++) {
    //     total += product[j].value
    //   }
    // }
    // console.log(total)
    // return this.productDetails.reviews.length
  }

  plusSlides(number: number) {
    // this.showSlides1(this.slideIndex += number);
  }

  // showSlides1(n: any) {
  //   let i;
  //   let slides = document.getElementsByClassName("slider");
  //   let dots = document.getElementsByClassName("dot");
  //   if (n > slides.length) {
  //     this.slideIndex = 1
  //   }
  //   if (n < 1) {
  //     this.slideIndex = slides.length
  //   }
  //   for (i = 0; i < slides.length; i++) {
  //     // @ts-ignore
  //     slides[i].style.display = "none";
  //   }
  //   for (i = 0; i < dots.length; i++) {
  //     dots[i].className = dots[i].className.replace(" active", "");
  //   }
  //   // @ts-ignore
  //   slides[this.slideIndex - 1].style.display = "block";
  //   dots[this.slideIndex - 1].className += " active";
  // }
}
