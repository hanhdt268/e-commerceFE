import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {OrderService} from "../../../service/order.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSort} from "@angular/material/sort";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatTableModule} from "@angular/material/table";
import {CurrencyPipe, DatePipe, NgClass, NgFor, NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {AddShipperComponent} from "../add-shipper/add-shipper.component";
import {NgxPaginationModule} from "ngx-pagination";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'], animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  standalone: true,
  imports: [MatTableModule, NgFor, MatButtonModule, NgIf, MatIconModule, RouterLink, MatListModule, MatCardModule, CurrencyPipe, NgClass, DatePipe, RouterLinkActive, NgxPaginationModule],
})

export class OrderDetailsComponent implements OnInit, AfterViewInit {
  @ViewChildren("submenu_item") column!: ElementRef<HTMLElement>
  dataSource: any[] = []
  status = "All"
  update: any
  displayedColumns = ['Id', 'ProductName', 'Name', 'Quantity', 'Address', 'Contact', 'Date', 'Status', 'Action']
  @ViewChild('paginator') paginator!: MatPaginator
  @ViewChild('OFl2GI') button!: ElementRef
  allComplete: boolean = false;
  @ViewChild(MatSort) sort!: MatSort
  columnsToDisplay = ['Id', 'orderFullName', 'quantity', 'orderAmount', 'orderStatus', 'paymentMethod']
  innerDisplayedColumns = ['pId', 'title', 'discountPrice', 'quantity', 'total']
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];

  count: number = 0;
  tableSize: number = 10;
  pageNumber = 0

  constructor(private _order: OrderService, private _dialog: MatDialog) {
  }

  ngAfterViewInit(): void {
    console.log(this.column.nativeElement)

  }

  ngOnInit(): void {
    this.getAllOrderDetails(this.status);
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

  public getAllOrderDetails(statusParameter: any) {
    this._order.getAllOderDetails(statusParameter).subscribe({
      next: (resp) => {
        this.dataSource = resp.reverse()
        // this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort
        console.log(resp);
      }, error: (error) => {
        console.log(error)
      }
    })
  }

  markOrderAsConfirm(oderId: any) {
    this._order.markOrderAsConfirm(oderId).subscribe({
      next: (resp) => {
        console.log(resp)
        this.getAllOrderDetails(this.status);
      }
    })
  }

  openDialog(orderId: any) {
    const dialogRef = this._dialog.open(AddShipperComponent, {
      data: {orderId: orderId},
      width: "35%",
      height: "220px",
    })
    dialogRef.afterClosed().subscribe(result => {
      this.getAllOrderDetails(this.status);
    })

  }

  onTableDataChange(event: any) {
    this.pageNumber = event;
    this.getAllOrderDetails("All");
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.pageNumber = 1;
    this.getAllOrderDetails("All");
  }

  confirm(orderId: any) {
    this._order.markOrderAsConfirm(orderId).subscribe({
      next: (resp) => {
        console.log(resp)
        this.getAllOrderDetails(this.status)
      }
    })
  }

  handlerShow(expanded: any) {
    expanded.expanded = !expanded?.expanded
  }

  calculation(quantity: any, discount: any) {
    return quantity * discount
  }


}
