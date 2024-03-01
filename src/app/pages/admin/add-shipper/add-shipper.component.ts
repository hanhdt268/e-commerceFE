import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {OrderService} from "../../../service/order.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-add-shipper',
  templateUrl: './add-shipper.component.html',
  styleUrls: ['./add-shipper.component.css']
})
export class AddShipperComponent implements OnInit {
  shipper: any = []
  ship = {
    userID: '',
    orderId: ''
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _dialog: MatDialog,
              private _order: OrderService) {
  }

  ngOnInit(): void {
    this.getShipper()
  }

  getShipper() {
    this._order.getShipper().subscribe({
      next: (resp) => {
        this.shipper = resp
      }
    })
  }

  handlerShipper(userID: any) {
    this._order.createShip(this.data.orderId, userID).subscribe({
      next: (resp) => {
        this._order.markOrderAsConfirm(this.data.orderId).subscribe({
          next: (resp) => {
            console.log(resp)
          }
        })
        Swal.fire('Đã phân công', '', "success")
        this.closeDialog();
      }
    })
  }

  closeDialog() {
    this._dialog.closeAll();
  }

  markOrderAsConfirm(oderId: any) {
    this._order.markOrderAsConfirm(oderId).subscribe({
      next: (resp) => {
        console.log(resp)
      }
    })
  }
}
