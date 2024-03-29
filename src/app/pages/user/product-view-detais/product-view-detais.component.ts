import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../service/product.service";
import {ImageProcessingService} from "../../../service/image-processing.service";
import {CartService} from "../../../service/cart.service";
import {Product} from "../../../_model/product.model";
import {CommentModel} from "../../../_model/comment.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {CommentService} from "../../../service/comment.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-product-view-detais',
  templateUrl: './product-view-detais.component.html',
  styleUrls: ['./product-view-detais.component.css']
})
export class ProductViewDetaisComponent implements OnInit {
  // @ts-ignore
  product: Product
  pId: any;
  pageNumber = 0
  productDetails: any = [];
  value: any
  demo: any
  stars = [1, 2, 3, 4, 5]

  user: any
  isShow!: boolean
  selectedProductIndex = 0;
  comment: CommentModel = {
    // @ts-ignore
    comId: null,
    content: '',
  }
  formComment!: FormGroup

  isShowReview = false

  quantityProduct: number = 1;
  cart = {
    quantity: 0
  }
  isDisable = true;

  @ViewChild("input") input!: ElementRef

  constructor(private _activeRoute: ActivatedRoute, private _router: Router,
              private _productService: ProductService,
              private _imageProcessing: ImageProcessingService,
              private _cart: CartService, private _fb: FormBuilder,
              private _comment: CommentService, private translation: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.translation.setDefaultLang("vn")
    this.product = this._activeRoute.snapshot.data['product'];
    this.getProductOfCategory();
    this.getProductById()
    this.getCountStartsByUser();
    this.getStars()
    this.formComment = this._fb.group({
      content: new FormControl('', [Validators.required])
    })
    for (const review of this.product.reviews) {
      if (review.active) {
        this.isShowReview = true
      }
    }
  }

  addToCart(pId: any) {
    this.cart.quantity = this.quantityProduct
    this._cart.addToCart(this.cart, pId).subscribe({
      next: (response: any) => {
        window.location.reload();
        console.log(response)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  changeIndex(index: any) {
    this.selectedProductIndex = index;
    // console.log(index)
  }

  getStars() {
    this._productService.getStars(this.product.pid).subscribe({
      next: (resp: any) => {
        console.log(resp)
        this.value = Math.round(resp)
        this.demo = Math.round(resp)

      }
    })
  }

  buyProduct(pid: any) {
    this._router.navigate(['/buyProduct', {
      isSingleProductCheckOut: true, id: pid,
    }])
  }

  public getProductOfCategory(searchKey: string = "") {
    this._productService.getProductBySuggest(this.product.category.cateId, this.product.discountPrice, this.product.price, this.pageNumber)

      .subscribe({
        // @ts-ignore

        next: (data: Product[]) => {
          console.log(data);
          this.productDetails = data
        },

      })
  }

  getProductById() {
    this._productService.getProductById(this.product.pid).subscribe({
      next: (resp: any) => {
        this.product.comment = resp.comment
        console.log(resp);
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  handlerCompare(pid: any, productId: any) {
    this._router.navigate([`/compare/${pid}/voi/${productId}`])
  }

  previous() {
    this.pageNumber = this.pageNumber - 1
    this.getProductOfCategory();
  }

  next() {
    this.pageNumber = this.pageNumber + 1
    this.getProductOfCategory();
  }

  showProductDetails(pid: any) {
    this._router.navigate(['productViewDetails', {pid: pid}]).then((r) => {
      window.location.reload();
    })
  }

  addComment(pId: any) {
    this._comment.commentProduct(pId, this.comment).subscribe({
      next: (resp) => {
        this.product = this._activeRoute.snapshot.data['product'];
        this.getProductById();
        this.comment.content = '';
        console.log(resp)
        Swal.fire('Successfully', '', 'success')
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  getCountStartsByUser() {
    this._productService.getCountStartsByUser(this.product.pid).subscribe({
      next: (resp: any) => {
        console.log(resp)
        this.user = resp
      }
    })
  }

  decrease() {
    this.quantityProduct = this.quantityProduct - 1
  }

  increase() {
    this.quantityProduct = this.quantityProduct + 1
  }

  checkValue() {
    if (this.quantityProduct > this.product.quantum) {
      this.quantityProduct = this.product.quantum
    }
  }
}
