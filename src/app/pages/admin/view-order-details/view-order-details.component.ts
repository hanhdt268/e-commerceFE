import {Component, Inject, OnInit} from '@angular/core';
import {OrderService} from "../../../service/order.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-view-order-details',
  templateUrl: './view-order-details.component.html',
  styleUrls: ['./view-order-details.component.css']
})
export class ViewOrderDetailsComponent implements OnInit {
  orderDetails: any = []

  constructor(private _order: OrderService,
              @Inject(MAT_DIALOG_DATA) public data: any, private _dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getOrderById();
  }

  getOrderById() {
    this._order.getOrderById(this.data.oderId).subscribe({
      next: (resp) => {
        console.log(resp)
        this.orderDetails = resp;
      }
    })
  }

  closeDialog() {
    this._dialog.closeAll();
  }
}
