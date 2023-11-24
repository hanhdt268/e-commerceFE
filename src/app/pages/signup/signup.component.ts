import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public user = {
    username: '',
    fullName: '',
    password: '',
    email: '',
    phone: '',
    address: '',
  }
  // @ts-ignore
  form: FormGroup;

  constructor(private _fb: FormBuilder, private userService: UserService, private _snack: MatSnackBar, private _router: Router) {
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      username: new FormControl("", [Validators.required]),
      fullName: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      address: new FormControl("", [Validators.required]),
      phone: new FormControl("", [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]),
    })
  }

  formSubmit() {
    if (this.user.username == '' || this.user.username == null) {
      this._snack.open('User is required !!', '', {
        duration: 3000
      });
      return;
    }

    this.userService.addUser(this.user).subscribe({
      next: (data: any) => {
        this._router.navigate(['login'])
        Swal.fire('Sign Up Successfully', '', 'success')
      },
      error: (error: any) => {
        this._snack.open('user already exists !!', '', {
          duration: 3000
        });

      },
      complete: () => console.log("the end")
    })
  }
}
