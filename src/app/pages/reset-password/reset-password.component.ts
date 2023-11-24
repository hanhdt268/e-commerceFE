import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  form!: FormGroup
  user = {
    password: '',
    confirmPassword: ''
  }
  confirmPassword!: string
  tokenValue!: string;
  isConfirmPasswordDirty = false;
  passwordsMatching = false;

  @ViewChild("pw") pw!: ElementRef
  @ViewChild("cpw") cpw!: ElementRef

  constructor(private _route: ActivatedRoute, private _fb: FormBuilder,
              private _user: UserService, private _router: Router) {

  }

  formSubmit() {
    if (this.pw.nativeElement.value !== this.cpw.nativeElement.value) {
      Swal.fire("Password and Confirm Password do not match", '', "error")
    } else {
      this._user.resetPassword(this.user, this.tokenValue).subscribe({
        next: (resp: any) => {
          console.log(resp)
          Swal.fire("Reset password success", '', "success").then(resp => {
            this._router.navigate(['login'])
          })
        }
      })
    }

  }

  ngOnInit(): void {
    this.form = this._fb.group({
        password: new FormControl("", [Validators.required]),
        confirmPassword: new FormControl("", [Validators.required])
      },
    )
    this._route.queryParamMap.subscribe(params => {
      // @ts-ignore
      this.tokenValue = params.params.token;
      console.log(params)
    })

    console.log(this.tokenValue)
  }


}
