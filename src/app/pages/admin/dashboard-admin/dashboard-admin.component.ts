import {Component, OnInit} from '@angular/core';
import {ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexTitleSubtitle, ApexXAxis, ApexYAxis} from "ng-apexcharts";
import {OrderService} from "../../../service/order.service";

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {

  series1!: ApexAxisChartSeries;
  chart!: ApexChart;
  title!: ApexTitleSubtitle
  xavis!: ApexXAxis
  yavis!: ApexYAxis
  dataLable!: ApexDataLabels
  series2!: ApexAxisChartSeries;
  chart1!: ApexChart;
  title1!: ApexTitleSubtitle
  xavis1: string[] = []
  dataLable1!: ApexYAxis

  quantity: any;
  total: any;
  statusPlaced: any;
  statusDelivered: any;
  statusCancel: any;
  category: any
  demo: any

  constructor(private _order: OrderService) {
  }

  ngOnInit(): void {
    this._order.getPresentCategory().subscribe({
      next: (resp) => {
        console.log(resp)
        this.category = resp
        const amount = [];
        const title = []
        for (const res of resp) {
          amount.push(res.amount)
          title.push(res.title)
        }

        console.log(amount)
        console.log(title)
        this.title1 = {
          text: "Tổng tiền bán ra tính % của thể loại"
        }
        // @ts-ignore
        this.series2 = [Math.round(this.category[0].amount), Math.round(this.category[1].amount), Math.round(this.category[2].amount)]
        this.chart1 = {
          type: "pie",
          toolbar: {show: true}
        }

        this.dataLable1 = {
          labels: {
            formatter: function nFormatter(num: any) {
              if (num >= 1000000000) {
                return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
              }
              if (num >= 1000000) {
                return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
              }
              if (num >= 1000) {
                return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
              }
              return num;
            },
          }
        }
        this.xavis1 = [this.category[0].title, this.category[1].title, this.category[2].title]
      }
    })

    this._order.getAmountByMonth().subscribe({
      next: (resp) => {
        console.log(resp)
        this.demo = resp
        const amount = [];
        const month = [];
        for (let i = 0; i < resp.length; i++) {
          amount.push(resp[i].mount)
          month.push(resp[i].mothName)
        }
        this.title = {text: "Tổng tiền bán ra hàng tháng"}
        this.series1 = [{
          name: 'product',
          data: amount
        }
        ];
        this.dataLable = {

          // @ts-ignore
          formatter: function nFormatter(num: any) {
            if (num >= 1000000000) {
              return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
            }
            if (num >= 1000000) {
              return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
            }
            if (num >= 1000) {
              return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
            }
            return num;
          }
        }
        this.chart = {
          type: "bar"
        }
        this.xavis = {
          categories: month
        }
        this.yavis = {
          labels: {
            formatter: function nFormatter(num: any) {
              if (num >= 1000000000) {
                return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
              }
              if (num >= 1000000) {
                return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
              }
              if (num >= 1000) {
                return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
              }
              return num;
            }
          }

        }
      }
    })
    this._order.getTotalAmount().subscribe({
      next: (resp: any) => {
        this.total = resp;
        console.log(resp);
      }
    })
    this._order.getTotalQuantity().subscribe({
      next: (resp) => {
        this.quantity = resp;
        console.log(resp)
      }
    })
    this._order.getCountCancel().subscribe({
      next: (resp) => {
        this.statusCancel = resp;
        console.log(resp)
      }
    })
    this._order.getTotalDelivered().subscribe({
      next: (resp) => {
        this.statusDelivered = resp;
        console.log(resp)
      }
    })
    this._order.getStatusOrder("Đang giao").subscribe({
      next: (resp) => {
        this.statusPlaced = resp;
        console.log(resp)
      }
    })
  }

  test() {

  }
}
