import {Component, Inject, OnInit} from '@angular/core';
import {Manufacturer} from "../../../_model/manufacturer.model";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ManufacturerService} from 'src/app/service/manufacturer.service';
import {CategoryService} from 'src/app/service/category.service';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-update-manufacturer',
  templateUrl: './update-manufacturer.component.html',
  styleUrls: ['./update-manufacturer.component.css']
})
export class UpdateManufacturerComponent implements OnInit {
  mId: any
  pageNumber = 0;
  manufacturer!: Manufacturer;
  categories: any = []

  constructor(private _manufacturer: ManufacturerService, private _route: ActivatedRoute,
              private _router: Router,
              @Inject(MAT_DIALOG_DATA) public data: any, private _dialog: MatDialog,
              private _categoriess: CategoryService, private _snack: MatSnackBar
  ) {
  }

  ngOnInit(): void {

    this.getManufacturerById();
    this._categoriess.categories().subscribe({
      next: (data: any) => {
        this.categories = data;
        console.log(data)
      },
      error: (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading data from serve', 'error')
      }
    });
  }

  getManufacturerById() {
    this._manufacturer.getManufacturerById(this.data.mId).subscribe({
      next: (resp: any) => {
        console.log(resp)
        this.manufacturer = resp;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  formSubmit() {
    this._manufacturer.updateManufacturer(this.manufacturer).subscribe({
      next: (resp) => {
        this.closeDialog();
        Swal.fire('Successfully', 'Update Manufacturer Success', "success")
      },
      error: (error) => {
        console.log(error)
        this._snack.open('title already exists !!', '', {
          duration: 3000
        });

      }
    })
  }

  closeDialog() {
    this._dialog.closeAll();
  }
}
