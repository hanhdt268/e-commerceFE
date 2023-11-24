import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../../service/user.service";
import Swal from "sweetalert2";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-manager-account',
  templateUrl: './manager-account.component.html',
  styleUrls: ['./manager-account.component.css']
})
export class ManagerAccountComponent implements OnInit {
  user: any = []
  displayedColumns: string[] = ['Id', 'Product Image', 'Product Name', 'Product ActualPrice', 'Product DiscountPrice', 'UseStage', 'Actions'];

  showLock: any = false;
  showUnLock: any = false;

  @ViewChild(MatSort) sort!: MatSort

  constructor(private _user: UserService) {
  }

  ngOnInit(): void {
    this.getAllUser();

  }

  getAllUser() {
    this._user.getAllUser().subscribe({
      next: (resp) => {
        console.log(resp)
        // @ts-ignore
        this.user = new MatTableDataSource(resp);
        this.user.sort = this.sort;

      }
    })
  }

  lock(userID: number) {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure?',
      confirmButtonText: 'LOCK',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this._user.lockAccount(userID).subscribe({
          next: (resp: any) => {
            console.log(resp)
            Swal.fire('Account is locked', '', 'success')
            this.getAllUser();
          }, error: (error) => {
            console.log(error)
            Swal.fire('Account  islocked', '', 'error')
          }
        })
      }
    })

  }

  unLock(userID: any) {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure?',
      confirmButtonText: 'UNLOCK',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this._user.unLockAccount(userID).subscribe({
          next: (resp: any) => {
            console.log(resp)
            Swal.fire('Account is unLocked', '', 'success')
            this.getAllUser();
          }, error: (error) => {
            console.log(error)
            Swal.fire('Account  is unLocked', '', 'error')
          }
        })
      }
    })
  }
}
