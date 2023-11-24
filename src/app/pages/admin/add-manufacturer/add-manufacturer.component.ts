import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Manufacturer } from 'src/app/_model/manufacturer.model';
import { CategoryService } from 'src/app/service/category.service';
import { ManufacturerService } from 'src/app/service/manufacturer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-manufacturer',
  templateUrl: './add-manufacturer.component.html',
  styleUrls: ['./add-manufacturer.component.css']
})
export class AddManufacturerComponent implements OnInit {
  categories: any = []
  manufacturer = {
    manuId: null,
    title: '',
    category: {
      cateId: ''
    }
  };
  // @ts-ignore
  form: FormGroup
  constructor(private _manufacturer: ManufacturerService, private _dialog: MatDialog,
    private _fb: FormBuilder,
    private _categoriess: CategoryService){}
  ngOnInit(): void {
    this.form = this._fb.group({
      title: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
    })
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
  formSubmit() {
    // @ts-ignore
    this._manufacturer.addManufacturer(this.manufacturer).subscribe({
      next: (data: any) => {
        console.log(data)
        this.manufacturer.title = ''
        Swal.fire('Success', '', 'success')
        this.closeDialog();
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  closeDialog() {
    this._dialog.closeAll();
  }
}
