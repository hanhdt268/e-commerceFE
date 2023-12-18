import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../service/product.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {OderDetails} from "../../../_model/order-details.model";
import Swal from "sweetalert2";
import {OrderService} from "../../../service/order.service";
import {CartService} from "../../../service/cart.service";
import {LoginService} from "../../../service/login.service";

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent implements OnInit {
  // @ts-ignore
  form: FormGroup
  productDetails: any = []
  orderDetails: OderDetails = {
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    note: '',
    quantity: '',
    orderDate: new Date(),
    oderProductQuantityList: []
  }
  notifications: any = {
    count: '',
    oderProductQuantityList: []
  }
  isShow: boolean = true;
  item: number = 0
  isCartCheckout: string | null = '';
  // }
  checkPlacedOrder!: boolean;
  index: any;
  pid: any;
  cart: any = []

  quantity1: any = 1
  quantity: any = 1
  user: any
  id: any = []

  constructor(private _activeRoute: ActivatedRoute,
              private _productService: ProductService,
              private _router: Router,
              private _snack: MatSnackBar,
              private _fb: FormBuilder,
              private _http: HttpClient,
              private _order: OrderService,
              private _cart: CartService,
              private _login: LoginService
  ) {
  }

  ngOnInit(): void {
    // @ts-ignore
    var param = this._activeRoute.snapshot.params.cartId
    var item = param.split(",")
    var ar1 = item[0];
    var ar2 = item[1];
    this.id.push(item)
    // this.id.push(ar1, ar2)
    console.log(this.id)

    this.user = this._login.getUser();
    // console.log(this.user)
    this._cart.getProducts(this.user.userID, this.id).subscribe({
      // @ts-ignore

      next: (resp: any[]) => {
        console.log(resp)
        this.productDetails = resp
      }
    })
    // this.productDetails = this._activeRoute.snapshot.data['productDetails'];
    // console.log(this.productDetails)
    // this.isCartCheckout = this._activeRoute.snapshot.paramMap.get('isSingleProductCheckOut')
    // this.productDetails.forEach(
    //   x => this.orderDetails.oderProductQuantityList.push(
    //     {pid: x.pid, quantity: 1}
    //   )
    // )
    //
    // this.productDetails.forEach(
    //   x => this.notifications.oderProductQuantityList.push(
    //     {pid: x.pid, quantity: 1}
    //   )
    // )
    //
    // this.getCart();
    //
    this.form = this._fb.group({
      fullName: new FormControl("", [Validators.required]),
      fullAddress: new FormControl("", [Validators.required]),
      contactNumber: new FormControl("", [Validators.required]),
      note: new FormControl("", [Validators.required])
    })
    // console.log(this.productDetails)
    // console.log(this.orderDetails)
  }

  // public getCart() {
  //   this._cart.getCartDetails().subscribe({
  //     next: (resp: any) => {
  //       console.log(resp)
  //       this.cart = resp;
  //
  //     }
  //   })
  // }

  public notify() {
    this._http.post(`http://localhost:8080/notify/add`, this.notifications).subscribe({
      next: (resp) => {
        console.log(resp)
      }
    })
  }

  public placeOder() {

    Swal.fire({
      title: 'Bạn đã đặt hàng thành công, Đơn hàng sẽ được giao đến bạn sau 3-4 ngày',

      icon: "success",
      timer: 1000,

      // didOpen: () => {
      //   // @ts-ignore
      //   Swal.showLoading()
      //   // @ts-ignore
      //   const b = Swal.getHtmlContainer().querySelector('b')
      //   timerInterval = setInterval(() => {
      //     // @ts-ignore
      //     b.textContent = Swal.getTimerLeft()
      //   }, 100)
      // },
      // willClose: () => {
      //   clearInterval(timerInterval)
      // }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        this.checkPlacedOrder = true
        this._order.placeOder1(this.orderDetails, this.user.userID, this.id, false).subscribe({
          next: (data: any) => {
            this.notify();
            this._router.navigate(['homepage/0']).then(
              resp => window.location.reload()
            )
            this.checkPlacedOrder = false

          },
          error: (error) => {
            console.log(error)
          }
        })
      }
    })
  }

  getQuantityForProduct(pid: any) {
    const filterProduct = this.orderDetails.oderProductQuantityList.filter(
      (productQuantity) => productQuantity.pid === pid
    )
    return filterProduct[0].quantity
  }

  getCalculatedProduct(pid: number, discountPrice: number, quantity: any) {
    const filterProduct = this.productDetails.filter(
      (productQuantity: any) => productQuantity.pid === pid
    )

    // let total = 0;
    // total = total + discountPrice * quantity;
    // console.log(total)

    return quantity * discountPrice
  }

  onQuantityChanged(quantity: any, pid: number, quantityy: number) {
    this.orderDetails.oderProductQuantityList.filter(
      (oderProduct) =>
        oderProduct.pid === pid,
    )[0].quantity = quantity
    if (quantity > quantityy) {
      this.isShow = false;
      Swal.fire('Khong du hang', '', 'error')
    } else {
      this.isShow = true;
    }
    console.log(pid)
    console.log(quantityy);
  }

  getCalculatedGrandTotal() {
    let grandTotal = 0;
    // this.orderDetails.oderProductQuantityList.forEach(
    //   (productQuantity) => {
    //     const price = this.productDetails.filter(product => product.pid === productQuantity.pid)[0].discountPrice;
    //     grandTotal = grandTotal + price * productQuantity.quantity
    //   }
    // )
    // return grandTotal;
    // this.productDetails.filter((product: any) => product.pid === )
    let total = 0;

    for (let i = 0; i < this.productDetails.length; i++) {
      total += this.productDetails[i].product.discountPrice * this.productDetails[i].quantity
    }
    return total;
  }

  decrease(pid: number, quantityy: number) {
    this.orderDetails.oderProductQuantityList.filter(
      (oderProduct) =>
        oderProduct.pid === pid,
    )[0].quantity = (this.quantity1 = this.quantity1 - 1);
  }

  increase(pid: number, quantityy: number) {
    var first = 1;
    this.orderDetails.oderProductQuantityList.filter(
      (oderProduct) =>
        oderProduct.pid === pid,
    )[0].quantity = (this.quantity1 = this.quantity1 + 1);
  }
}
