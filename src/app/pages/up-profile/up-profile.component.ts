import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {LoginService} from "../../service/login.service";
import {UserService} from "../../service/user.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-up-profile',
  templateUrl: './up-profile.component.html',
  styleUrls: ['./up-profile.component.css']
})
export class UpProfileComponent implements OnInit {
  id: any;
  user: any;

  // @ts-ignore
  form: FormGroup

  constructor(private _route: Router, private dialog: MatDialog,
              private _login: LoginService, private _user: UserService, private route: ActivatedRoute,
              private _fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      fullName: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
    })
    // @ts-ignore
    this.id = this.route.snapshot.params.userId;
    this.user = this._login.getUser();
    console.log(this.user)
  }

  updateUser() {
    this._user.updateUser(this.user).subscribe({
      next: (data: any) => {
        Swal.fire('Successfully', "Profile updated", 'success')
        this._login.setUser(data);
        this.closeDialog();
      },
      error: (error) => {
        Swal.fire('Error', "Profile error", 'error')
        console.log(error)
      }
    })
    console.log(this.user)
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
