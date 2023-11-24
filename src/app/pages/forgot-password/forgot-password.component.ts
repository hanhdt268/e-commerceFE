import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../service/user.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  form!: FormGroup

  sendMail = {
    email: ''
  }

  constructor(private _fb: FormBuilder, private _user: UserService) {
  }

  formSubmit() {
    this._user.forgetPassword(this.sendMail).subscribe({
      next: (resp) => {
        console.log(resp)
        this.sendMail.email = '';
        Swal.fire("Send mail success", '', 'success')
      },
      error: (error) => {
        console.log(error)
        Swal.fire("Send mail error", '', 'error')

      }
    })
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      email: new FormControl("", [Validators.required, Validators.email])
    })
  }


}
