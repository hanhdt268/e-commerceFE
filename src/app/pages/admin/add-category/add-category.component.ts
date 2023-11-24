import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from 'src/app/_model/category.model';
import { CategoryService } from 'src/app/service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  
  category: Category = {
    // @ts-ignore
    cId: null,
    title: '',
  }
  // @ts-ignore
  form: FormGroup
  constructor(private _category: CategoryService, private _snack: MatSnackBar,
    private _dialog: MatDialog,
    private _fb: FormBuilder){}
  ngOnInit(): void {
    this.form = this._fb.group({
      title: new FormControl('', [Validators.required])
    })
  }
  formSubmit() {
    if (this.category.title.trim() == '' || this.category.title == null) {
      this._snack.open('Title Required !!', '', {
        duration: 3000
      })
      return;
    }

    //all done
    this._category.addCategory(this.category).subscribe({
      next: (data: Category) => {
        this.category.title = '';
        this.closeDialog();
        Swal.fire('Success', '', 'success')
      },
      error: (error) => {
        console.log(error);
        Swal.fire('Error', '', 'error')
      }
    })
  }

  closeDialog() {
    this._dialog.closeAll();
  }
}
