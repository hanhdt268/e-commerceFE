import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LoginService} from "../../service/login.service";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../service/user.service";
import {UpProfileComponent} from "../up-profile/up-profile.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any
  user1: any
  form: any = {};
  isShow!: boolean
  changeAvatar!: any

  constructor(private _loginService: LoginService, private _dialog: MatDialog, private _user: UserService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.user = this._loginService.getUser();
    console.log(this.user)
    this.loadProfile();
  }

  loadProfile() {
    this.user = this._loginService.getUser();
  }

  openDialog() {
    const profile = this._dialog.open(UpProfileComponent, {width: "60%", height: "500px"})
    profile.afterClosed().subscribe(r => {
      this.loadProfile();
    })
  }

  onLoadAvatar(event: string) {
    console.log(event);
    this.user.avatar = event
    this.isShow = true;
  }

  onSubmit() {
    this._user.changeAvatar(this.user).subscribe({
      next: (resp: any) => {
        console.log(resp)
        this._loginService.setUser(resp)
        window.location.reload()
      },
      error: (error) => {
        console.log(error)
      }

    })
  }
}
