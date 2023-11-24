import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Product} from "../../../_model/product.model";
import {MyOrderDetails} from "../../../_model/order.model";
import {ProductService} from "../../../service/product.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {LoginService} from "../../../service/login.service";
import {OrderService} from "../../../service/order.service";
import {ReviewComponent} from "../review/review.component";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatTableModule} from "@angular/material/table";
import {CurrencyPipe, DatePipe, NgClass, NgFor, NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'], animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  standalone: true,
  imports: [MatTableModule, NgFor, MatButtonModule, NgIf, MatIconModule, RouterLink, MatListModule, MatCardModule, CurrencyPipe, DatePipe, NgClass],
})
export class MyOrdersComponent implements OnInit {

  product!: Product
  myOrderDetails: MyOrderDetails[] = []
  status: any = "All"
  pId: any
  user: any;
  @ViewChild('section') section!: ElementRef<HTMLElement>
  displayedColumns = ['Images', 'Name', 'ContactNumber', 'Quantity', 'Amount', 'Date', 'Status', 'Action'];
  columnsToDisplay = ['Id', 'orderFullName', 'quantity', 'orderAmount', 'orderStatus', 'paymentMethod']
  innerDisplayedColumns = ['pId', 'title', 'discountPrice', 'quantity', 'total', 'action']
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];

  constructor(private _productService: ProductService, private _dialog: MatDialog,
              private _activeRoute: ActivatedRoute,
              private _router: Router,
              private _user: LoginService,
              private _order: OrderService) {
  }

  ngOnInit(): void {
    this.user = this._user.getUser()
    console.log(this.user)
    this.getOderDetails("All");
    var bntContainer = document.getElementById("navbar")
    // @ts-ignore
    var bnt = bntContainer.getElementsByClassName("btn")
    for (let i = 0; i < bnt.length; i++) {
      bnt[i].addEventListener('click', function () {
        var current = document.getElementsByClassName("active")
        console.log(current)
        // @ts-ignore
        current[0].className = current[0].className.replace(" active")
        // @ts-ignore
        this.className += " active"
      })

    }
  }

  public getOderDetails(statusParameter: any) {
    this._order.getOrderDetails(this.user?.userID, statusParameter).subscribe({
      next: (response: MyOrderDetails[]) => {
        console.log(response)
        this.myOrderDetails = response;

      }, error: (error) => {
        console.log(error)
      }
    })
  }

  orderDelivery(oderId: any) {
    this._order.markOrderAsReceived(oderId).subscribe({
      next: (resp) => {
        console.log(resp)
        this.getOderDetails(this.status);
      }
    })
  }

  orderAgain(pid: number | undefined) {
    this._router.navigate(['productViewDetails', {pid: pid}])
  }

  markOrderAsDestroy(orderId: any) {
    this._order.markOrderAsDestroy(orderId).subscribe({
      next: (resp) => {
        console.log(resp)
        this.getOderDetails(this.status)
      }
    })
  }

  onDialog(pid: any, oderId: any) {
    const order = this._dialog.open(ReviewComponent, {
      data: {pid: pid, oderId: oderId},
      width: '700px',
      height: '630px'
    })
    order.afterClosed().subscribe(r => {

      this.getOderDetails(this.status);
    })
  }

  calculation(quantity: any, discountPrice: any) {
    return quantity * discountPrice
  }

  handlerShow(element: any) {
    element.expanded = !element?.expanded

  }

  cancel(orderId: any) {
    this._order.markOrderAsDestroy(orderId).subscribe({
      next: (resp) => {
        console.log(resp)
        this.getOderDetails(this.status)
      }
    })
  }

  received(orderId: any) {
    this._order.markOrderAsReceived(orderId).subscribe({
      next: (resp) => {
        console.log(resp)
        this.getOderDetails(this.status);
      }
    })
  }

  review(orderId: any) {


  }

  openDialogReview(pid: number) {
    this._dialog.open(ReviewComponent, {
      data: {pid: pid},
      width: '55%',
      height: '650px'
    })
  }
}
