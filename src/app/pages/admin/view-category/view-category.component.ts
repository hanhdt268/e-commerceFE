import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CategoryService} from 'src/app/service/category.service';
import Swal from 'sweetalert2';
import {UpdateCategoryComponent} from '../update-category/update-category.component';
import {AddCategoryComponent} from '../add-category/add-category.component';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {
  dataSource: any = []
  displayedColumns = ['Id', 'CategoryTitle', 'Action']

  constructor(private _category: CategoryService,
              private _dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadCategory();
  }


  loadCategory() {
    this._category.categories().subscribe({
      next: (data: any) => {
        this.dataSource = data;

        console.log(data)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  openDialog() {
    const manufacturer = this._dialog.open(AddCategoryComponent, {width: "40%", height: "300px"})
    manufacturer.afterClosed().subscribe(r => {
      this.loadCategory();
    })
  }

  delete(cateId: any) {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure?',
      confirmButtonText: 'Delete',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this._category.deleteCategory(cateId).subscribe({
          next: (data: any) => {
            this.dataSource = this.dataSource.filter((category: any) => category.cateId != cateId)
            Swal.fire('Successfully', 'Category deleted', 'success')
          },
          error: (error: any) => {
            Swal.fire('Error', 'Error in deleting Category', 'error')
          }
        })
      }
    })

  }

  openDialogUpdate(cateId: any) {
    console.log(cateId)
    const update = this._dialog.open(UpdateCategoryComponent, {
      data: {cateId: cateId},
      width: "40%",
      height: "300px"
    })
    update.afterClosed().subscribe(r => {
      this.loadCategory();
    })
  }

}
