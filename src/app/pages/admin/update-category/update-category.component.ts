import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Category} from 'src/app/_model/category.model';
import Swal from 'sweetalert2';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {CategoryService} from 'src/app/service/category.service';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
  cateId: any;
  // @ts-ignore
  category: Category;


  constructor(private _route: ActivatedRoute, private _category: CategoryService, private _router: Router,
              @Inject(MAT_DIALOG_DATA) public data: any, private _dialog: MatDialog,
              private _snack: MatSnackBar) {
  }

  ngOnInit(): void {
    console.log(this.data.cateId)
    this._category.getCategories(this.data.cateId).subscribe({
      next: (data: any) => {
        this.category = data
        console.log(data);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  formSubmit() {
    this._category.updateCategory(this.category).subscribe({
      next: (data: Category) => {
        this.closeDialog();
        Swal.fire('Successfully', 'Category Updated', 'success').then((e) => {
          this._router.navigate(['/admin/categories'])
        })
      },
      error: (error: any) => {
        console.log(error);
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
