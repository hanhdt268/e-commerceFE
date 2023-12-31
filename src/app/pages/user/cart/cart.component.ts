import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../../../service/login.service";
import {CartService} from "../../../service/cart.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  displayedColumns: string[] = ['Checkbox', 'Image', 'Name', 'DiscountPrice', 'Quantity', 'Amount', 'Action'];
  user: any
  cartDetails: any[] = []

  cartId: any = []
  quantityCart = 1;
  @ViewChild("check") check!: ElementRef
  selectAll = false

  checkCart = false;

  constructor(private _cart: CartService, private _router: Router,
              private _login: LoginService,
              private _route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.user = this._login.getUser()
    this.getCartDetails();

  }

  public getCartDetails() {
    this._cart.getCartDetails(this.user?.userID).subscribe({
      next: (response: any) => {
        this.cartDetails = response;

        console.log(response)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  handleCheckout() {
    this._router.navigate([`buyProduct/${this.cartId}`])
    // this._productService.getProductDetails(false, 0).subscribe({
    //   next:(response)=>{
    //     console.log(response)
    //   },error:(error)=>{
    //     console.log(error)
    //   }
    // })
  }

  delete(cartId: any) {
    Swal.fire({
      icon: 'warning',
      title: 'Bạn chắc chắn chưa?',
      confirmButtonText: 'Delete',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this._cart.deleteCartById(cartId).subscribe({
          next: (response) => {
            console.log(response)
            this.getCartDetails();
            window.location.reload()
          }, error: (error) => {
            console.log(error)
          }
        })
      }

    })
  }

  decrease(cartId: any) {
    this._cart.updateQuantity(cartId, "sub").subscribe({
      next: (resp) => {
        console.log(resp)
        this.getCartDetails();

      }
    })
  }

  increase(cartId: any) {
    this._cart.updateQuantity(cartId, "plus").subscribe({
      next: (resp) => {
        console.log(resp)
        this.getCartDetails();
      }
    })
  }

  handlerChecked(cartId: any, checked: boolean) {
    const index = this.cartId.indexOf(cartId);
    if (checked) {
      this.cartId.push(cartId);
      this.checkCart = true;
    } else {
      this.cartId.splice(index, 1)
      if (this.cartId.length == 0) {
        this.checkCart = false;
      }

    }
    console.log(this.cartId)
  }


  selectAll1(check: boolean) {
    // console.log(cartId)
    console.log(check)
    this.cartDetails.forEach((c: any) =>
      c.checked = this.selectAll
    )
    if (check) {
      this.cartDetails.forEach((c: any) =>
        this.cartId.push(c.cartId)
      )
      this.checkCart = true;
    } else {
      this.cartId.splice(0, 1000)
      this.checkCart = false;
    }
    console.log(this.cartId)
  }

  getCalculatedProduct(pid: number, discountPrice: any, quantity: any) {
    return discountPrice * quantity
  }

  navigate(pid: number) {
    this._router.navigate(['productViewDetails', {pid: pid}])
  }

  deleteAll() {
    Swal.fire({
      icon: 'info',
      title: 'Bạn chắc chắn chưa?',
      confirmButtonText: 'Delete',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this._cart.deleteByIdIn(this.cartId).subscribe({
          next: (resp) => {
            console.log(
              resp
            )
            Swal.fire('Xoá thành công', 'Sản phẩm đã được xóa', 'success')

            this.getCartDetails();
            window.location.reload()

          },
          error: (error: any) => {
            Swal.fire('Lỗi', 'Error in deleting cart', 'error')
          }
        })

      }
    })
  }
}
