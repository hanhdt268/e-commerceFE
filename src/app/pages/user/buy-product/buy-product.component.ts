import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../service/product.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {OderDetails} from "../../../_model/order-details.model";
import Swal from "sweetalert2";
import {OrderService} from "../../../service/order.service";
import {CartService} from "../../../service/cart.service";
import {LoginService} from "../../../service/login.service"
// @ts-ignore
import cities from "../../../../assets/cities.json";

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent implements OnInit {
  // @ts-ignore
  form: FormGroup
  productDetails: any = []
  dataProductDetails: any = []
  orderDetails: OderDetails = {
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    note: '',
    paymentMethod: '',
    quantity: '',
    orderDate: new Date(),
    oderProductQuantityList: []
  }
  notifications: any = {
    count: '',
    oderProductQuantityList: []
  }
  isShow = true;
  cashOnDelivery = true;
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
  tax = 0;

  amount = 0;
  exchangeRate!: number;
  vat: any
  USD: any;
  @ViewChild('paymentRef', {static: true}) paymentRef!: ElementRef;
  @ViewChild('check', {static: true}) check!: ElementRef;

  province: any[] = cities.cities;

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
    console.log(this.province)
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
        this.productDetails = resp
        let total = 0;
        this.productDetails.forEach((product: any) => {
          this.amount += product.product.discountPrice * product.quantity;
        })
        this.vat = total * 0.08;
        this.USD = Math.floor(this._order.convertVndToUsd(this.amount + this.vat, 23000)).toString()
        console.log(this.USD)
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
    // this._order.getExchangeRates().subscribe(data => {
    //   this.exchangeRate = data.rates.USD;
    // });
    if (this.cashOnDelivery) {
      paypal.Buttons(
        {

          createOrder: (data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: this.USD,
                    currency_code: 'USD'
                  }
                }
              ]
            });
          },
          onApprove: (data: any, actions: any) => {
            return actions.order.capture().then((details: any) => {
              if (details.status === 'COMPLETED') {
                this.orderDetails.paymentMethod = "Paypal"
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
            });
          },
          onError: (error: any) => {
            console.log(error);
          }
        }
      ).render(this.paymentRef.nativeElement);
    }
    // render(
    //   {
    //     id: "#myPaypalButtons",
    //     currency: "USD",
    //     value: this.USD,
    //     onApprove: (details) => {
    //       alert("Payment Successful!");
    //     }
    //   }
    // );
    // window.paypal.Buttons(
    //   {
    //     style: {
    //       layout: 'horizontal',
    //       color: 'blue',
    //       shape: 'rect',
    //       label: 'paypal',
    //     },
    //     createOrder: (data: any, actions: any) => {
    //       return actions.order.create({
    //         purchase_units: [
    //           {
    //             amount: {
    //               value: this.amount.toString(),
    //               currency_code: 'USD'
    //             }
    //           }
    //         ]
    //       });
    //     },
    //     onApprove: (data: any, actions: any) => {
    //       return actions.order.capture().then((details: any) => {
    //         if (details.status === 'COMPLETED') {
    //
    //         }
    //       });
    //     },
    //     onError: (error: any) => {
    //       console.log(error);
    //     }
    //   }
    // ).render(this.paymentRef.nativeElement);
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
        this.orderDetails.paymentMethod = "CashOnDelivery"
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
      // this.isShow = true;
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
    return total + this.tax;
  }


  getCalculatedTotal() {
    // this.orderDetails.oderProductQuantityList.forEach(
    //   (productQuantity) => {
    //     const price = this.productDetails.filter(product => product.pid === productQuantity.pid)[0].discountPrice;
    //     grandTotal = grandTotal + price * productQuantity.quantity
    //   }
    // )
    // return grandTotal;
    // this.productDetails.filter((product: any) => product.pid === )
    this._cart.getProducts(this.user.userID, this.id).subscribe({
      // @ts-ignore
      next: (resp: any[]) => {
        this.dataProductDetails = resp;
      }
    })
    console.log(this.dataProductDetails)

  }

  getCalculatedGrandTax() {
    let total = 0;

    for (let i = 0; i < this.productDetails.length; i++) {
      total += this.productDetails[i].product.discountPrice * this.productDetails[i].quantity
    }
    this.tax = total * 0.08;
    return this.tax;
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

  getCalculatedGrandPrice() {
    let total = 0;

    for (let i = 0; i < this.productDetails.length; i++) {
      total += this.productDetails[i].product.discountPrice * this.productDetails[i].quantity
    }
    return total;
  }


  handlerPaypal() {
    this.cashOnDelivery = !this.cashOnDelivery;
  }
}
