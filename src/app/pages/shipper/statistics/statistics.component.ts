import {Component, OnInit} from '@angular/core';
import {StatisticsShipperService} from "../../../service/statistics-shipper.service";
import {LoginService} from "../../../service/login.service";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  quantity: any;
  total: any;
  statusPlaced: any;
  statusDelivered: any;
  user: any

  constructor(private _shipper: StatisticsShipperService,
              private _login: LoginService) {
  }

  ngOnInit(): void {
    this.user = this._login.getUser();
    this._shipper.getTotal(this.user?.userID).subscribe({
      next: (resp) => {
        this.total = resp;
        console.log(resp)
      }
    })
    this._shipper.getDelivering(this.user?.userID).subscribe({
      next: (resp) => {
        this.statusPlaced = resp;
        console.log(resp)
      }
    })
    this._shipper.getDelivered(this.user?.userID).subscribe({
      next: (resp) => {
        this.statusDelivered = resp;
        console.log(resp)
      }
    })
    this._shipper.getQuantity(this.user?.userID).subscribe({
      next: (resp) => {
        this.quantity = resp;
        console.log(resp)
      }
    })
  }


}
