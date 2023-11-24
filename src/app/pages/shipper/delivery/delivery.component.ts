import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {OrderService} from "../../../service/order.service";
import {MatDialog} from "@angular/material/dialog";
import {LoginService} from "../../../service/login.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatTableModule} from "@angular/material/table";
import {CurrencyPipe, DatePipe, NgClass, NgFor, NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css'], animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  standalone: true,
  imports: [MatTableModule, NgFor, MatButtonModule, NgIf, MatIconModule, RouterLink, MatListModule, MatCardModule, CurrencyPipe, NgClass, DatePipe],
})
export class DeliveryComponent implements OnInit {
  dataSource: any[] = []
  status = "All"
  update: any
  user: any
  displayedColumns = ['Id', 'ProductName', 'Name', 'Quantity', 'Address', 'Contact', 'Date', 'Status', 'Action']
  @ViewChild('paginator') paginator!: MatPaginator
  allComplete: boolean = false;
  @ViewChild(MatSort) sort!: MatSort
  columnsToDisplay = ['Id', 'orderFullName', 'quantity', 'orderAmount', 'orderStatus', 'paymentMethod', 'action']
  innerDisplayedColumns = ['pId', 'title', 'discountPrice', 'quantity', 'total']
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];

  constructor(private _order: OrderService, private _dialog: MatDialog,
              private _login: LoginService) {
  }

  ngOnInit(): void {
    this.user = this._login.getUser()
    this.getAllOrderDetails(this.status)
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

  public getAllOrderDetails(status = "") {
    this._order.getOrderForShipper(this.user.userID, status).subscribe({
      // @ts-ignore
      next: (resp: any[]) => {
        this.dataSource = resp.reverse()
      }, error: (error) => {
        console.log(error)
      }
    })
  }

  // markOrderAsReceive(oderId: any) {
  //   this._order.markOrderAsDelivering(oderId).subscribe({
  //     next: (resp) => {
  //       console.log(resp)
  //       this.getAllOrderDetails(this.status);
  //     }
  //   })
  // }
  //
  // openDialog(oderId: any) {
  //   this._dialog.open(ViewOrderDetailsComponent, {
  //     data: {oderId: oderId},
  //     width: '700px',
  //     height: '700px'
  //   })
  // }
  //
  // markOrderAsDelivered(oderId: any) {
  //   this._order.markOrderAsDelivered(oderId).subscribe({
  //     next: (resp) => {
  //       console.log(resp)
  //       this.getAllOrderDetails(this.status);
  //     }
  //   })
  // }
  calculation(quantity: any, discountPrice: any) {
    return quantity * discountPrice
  }

  handlerShow(element: any) {
    element.expanded = !element?.expanded
  }

  receive(orderId: any) {
    this._order.markOrderAsDelivering(orderId).subscribe({
      next: (resp) => {
        this.getAllOrderDetails(this.status);
      }
    })
  }

  delivered(orderId: any) {
    this._order.markOrderAsDelivered(orderId).subscribe({
      next: (resp) => {
        this.getAllOrderDetails(this.status);
      }
    })
  }
}
