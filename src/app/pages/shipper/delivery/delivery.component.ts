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
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

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
  imports: [MatTableModule, NgFor, MatButtonModule, NgIf, MatIconModule, RouterLink, MatListModule, MatCardModule, CurrencyPipe, NgClass, DatePipe, MatFormFieldModule, MatOptionModule, MatSelectModule, FormsModule],
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
  columnsToDisplay = ['Id', 'orderFullName', 'quantity', 'orderAmount', 'orderStatus', 'action']
  innerDisplayedColumns = ['pId', 'title', 'discountPrice', 'quantity', 'total']
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  options: any[] = [
    {value: '0', viewValue: "Sản phẩm bị lỗi",},
    {value: '1', viewValue: "Sản phẩm bị vỡ"},
    {value: '2', viewValue: "Người bán gửi sai hàng"},
    {value: '3', viewValue: "Khác với mô tả"},
  ];
  selectedValue!: string;
  returnOrder = {
    note: ''
  }

  reasonId: any
  return: any;
  clicked = false;

  constructor(private _order: OrderService, private _dialog: MatDialog,
              private _login: LoginService,
              private _snack: MatSnackBar) {
  }

  ngOnInit(): void {
    this.user = this._login.getUser()
    this.getAllOrderDetails(this.status)
    // this.getOrderForShipping();
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

    // var e = document.getElementById("ddlViewBy");
    // var value = e.value;
    // var text = e.options[e.selectedIndex].text;
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

  // public getOrderForShipping() {
  //   this._order.getOrderForShipping(this.user.userID).subscribe({
  //     // @ts-ignore
  //     next: (resp: any[]) => {
  //       this.dataSource = resp.reverse()
  //     }, error: (error) => {
  //       console.log(error)
  //     }
  //   })
  // }

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
  handlerReturns(reason: any, orderId: any) {
    console.log(reason, orderId)
    this.returnOrder.note = reason;
  }

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

  delivered(orderId: any, shipId: any) {
    this._order.markOrderAsDelivered(orderId, shipId).subscribe({
      next: (resp) => {
        this.getAllOrderDetails(this.status);
      }
    })
  }

  returnsOrder(orderId: any) {
    this._order.returnsOrder(this.returnOrder, orderId).subscribe({
      next: (resp) => {
        this._snack.open("Returns order success", "", {
          duration: 3000,
        })
        this.getAllOrderDetails(this.status)
      }
    })
  }

  getReasonReturns() {
    this._order.getReasonReturns(this.reasonId).subscribe({
      next: (resp) => {
        this.return = resp
        console.log(resp)
      }
    })
  }

  reasonReturn(orderId: any) {
    this.reasonId = orderId;
    console.log(this.reasonId)
    this.clicked = true;
    this.getReasonReturns();
  }
}
