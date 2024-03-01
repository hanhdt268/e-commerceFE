import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {LoginService} from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginData = {
    username: '',
    password: ''
  }
  // @ts-ignore
  form: FormGroup;
  private config!: MatSnackBarConfig;

  constructor(private _fb: FormBuilder, private snack: MatSnackBar, private _login: LoginService, private _router: Router,
              private zone: NgZone) {
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    })
    // this.config = new MatSnackBarConfig();
    // this.config.panelClass = ["snackbar-container"];
    // this.config.verticalPosition = "top";
    // this.config.horizontalPosition = "right";
    // this.config.duration = 4000;
  }

  formSubmit() {
    this._login.generateToken(this.loginData).subscribe({
      next: (data: any) => {
        console.log("success");
        console.log(data)
        //login...
        this._login.loginUser(data.token);
        Swal.fire({
          title: 'Successfully',
          icon: "success",
          timer: 1000,
          // didOpen: () => {
          //   // @ts-ignore
          //   Swal.showLoading()
          //   // @ts-ignore
          //   const b = Swal.getHtmlContainer().querySelector('b')
          //   timerInterval = setInterval(() => {
          //     // @ts-ignore
          //     b.textContent = Swal.getTimerLeft()
          //   }, 100)
          // },
          // willClose: () => {
          //   clearInterval(timerInterval)
          // }
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            this._login.getCurrentUser().subscribe({
              next: (user: any) => {
                this._login.setUser(user);
                console.log(user)
                //admin: admin dashboard
                //normal: normal dashboard
                if (this._login.getUserRole() == 'Admin') {
                  this._router.navigate(['admin']).then(res => {
                    window.location.reload();
                  });

                  this._login.loginStatusSubject.next(true);
                } else if (this._login.getUserRole() == 'User') {
                  this._router.navigate(['homepage/0']).then(res => {
                    window.location.reload();
                  });
                  this._login.loginStatusSubject.next(true);
                } else if (this._login.getUserRole() == 'Shipper') {
                  this._router.navigate(['shipper'])
                  this._login.loginStatusSubject.next(true)
                } else {
                  this._login.logOut();
                }
              }
            })
          }
        })

      },
      error: (error) => {
        console.log("error");
        this.showSnackbar(error.message)
      },

      complete: () => {
        console.log("the end")
      }
    })
  }


  private showSnackbar(message: string): void {
    this.snack.open(message, 'done', {
      duration: 2700,
      panelClass: ['redNoMatch'],
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
    });
  }


}
