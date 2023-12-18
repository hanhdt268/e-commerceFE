import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {forkJoin} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {LoginService} from 'src/app/service/login.service';
import {Product} from "../../_model/product.model";
import {ProductService} from "../../service/product.service";
import {CartService} from "../../service/cart.service";
import {WebSocketService} from "../../WebSocketService";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit {
  isLoggedIn = false;
  avatar: any;
  productDetails: any = []
  user: any = null;
  @Input() shopping: any = 0
  @Input() notification: any = 0
  search: any
  valueSearchInput: any = []
  valueInput: string = ''
  isShow: boolean = false;
  isShowSearch: boolean = false;
  isShowNotifications: boolean = false;

  notifications: any = [];
  dataProductDetails: any = [];
  a: any
  width: number = 0;
  fromSearch!: FormGroup
  @ViewChild('fondovalor') fondovalor!: ElementRef;
  @ViewChild('suggest') suggest!: ElementRef;
  @ViewChild('notify') notify!: ElementRef;
  // @ts-ignore
  @ViewChild('heroForm') heroForm: ngForm;
  localStorageValue: any
  data: any
  pageNumber = 0

  constructor(public _login: LoginService, private _router: Router,
              private _fb: FormBuilder,
              private _http: HttpClient, private _product: ProductService,
              private _cart: CartService,
              private webSocketService: WebSocketService) {
    this.width = window.innerWidth
    // this._http.get(`http://localhost:8080/notify/notify`).subscribe({
    //   next: (resp) => {
    //     console.log(resp)
    //   }
    // })

  }

  ngAfterViewInit(): void {
    console.log("element input")
    this.notify.nativeElement.addEventListener("click", () => {
      this.isShowNotifications = this.notify.nativeElement.classList.toggle("showNotifications")
    })
  }

  ngOnInit(): void {
    this.localStorageValue = localStorage.getItem('valueInput')
    console.log(this.localStorageValue)
    if (this.localStorageValue === null) {
      this.valueSearchInput = []
    } else {
      this.valueSearchInput = JSON.parse(this.localStorageValue);
    }
    this.data = this.localStorageValue

    this.fromSearch = this._fb.group({
      search: new FormControl("", [Validators.required])
    })
    this.isLoggedIn = this._login.isLoggedIn();
    this.user = this._login.getUser();
    this._login.loginStatusSubject.asObservable().subscribe((data) => {
      this.isLoggedIn = this._login.isLoggedIn();
      this.user = this._login.getUser();
    })
    if (this.isLoggedIn && this.isAmin()) {
      this.getProductToSearch();
      this.getCountCartByUser();
    }
    this.connectWs();
  }


  public getProductToSearch(searchKey: string = '') {
    this._product.getProducts(searchKey).subscribe({
      // @ts-ignore
      next: (data: Product[]) => {
        this.productDetails = data
        this.dataProductDetails = this.productDetails
        // console.log(this.dataProductDetails)
      }
    })
  }

  getCountCartByUser() {
    this._cart.countCart(this.user.userID).subscribe({
      next: (resp) => {
        // console.log(resp)
        this.shopping = resp
      }
    })
  }

  logout() {
    this._login.logOut();
    window.location.reload();
  }

  connectWs() {

    if (this.isLoggedIn && !this.isAmin()) {
      let stompClient = this.webSocketService.connect();
      stompClient.connect({}, (frame: any) => {
        // Subscribe to notification topic
        stompClient.subscribe('/topic/notification', (resp: any) => {
          // Update notifications attribute with the recent messsage sent from the server
          this.notifications = JSON.parse(resp.body).reverse().slice(0, 5);
          let count = 0;
          for (let i = 0; i <= this.notifications.length - 1; i++) {
            this.notification = this.notifications.map((item: any) => item.count).reduce((acc: any, cur: any) =>
              acc + Number(cur), 0
            )
          }
          // console.log(this.notification)
          // console.log(this.notifications)
        })
      });
    }
  }

  // searchInput(event: any) {
  //   if (event.target.value != null) {
  //     this.dataProductDetails = this.productDetails.filter(
  //       (r: any) => !r.title.toLowerCase().search(new RegExp(this.valueInput.toLowerCase()))
  //     )
  //     console.log(this.valueInput)
  //   } else {
  //     this.dataProductDetails = this.productDetails;
  //   }
  // }


  // handleShow() {
  //   this.isShow = !this.isShow;
  //   this.dataProductDetails = this.productDetails;
  //   this.valueInput = '';
  // }
  //
  // handleSelect(title: any, pId: any) {
  //   this.valueInput = title;
  //   this.isShow = false;
  //   console.log(pId)
  //   this._router.navigate(['productViewDetails', {pId: pId}])
  // }

  // @ts-ignore
  public isAmin() {
    if (this._login.getUserRole() == "User") {
      return true;
    }
  }

  // @ts-ignore
  public isClient() {
    if (this._login.getUserRole() == "Admin") {
      return true;
    }
  }

  handler() {
    let valueInput = this.fondovalor.nativeElement.value
    this.valueSearchInput.push(valueInput)
    localStorage.setItem('valueInput', JSON.stringify(this.valueSearchInput.reverse()))
    // let item: any[] = [];


    //
    // console.log(abc)
    // item.push(valueInput)

    console.log(valueInput)
    forkJoin([this._router.navigate([`homepage/search/${valueInput}`]).then(r => {
      window.location.reload()
    }),
      this.fondovalor.nativeElement.value = ""])
  }

  handlerShow() {
    if (this.fondovalor.nativeElement.value === '') {
      this.isShow = this.fondovalor.nativeElement.classList.toggle('show')
    } else {
      this.isShow = this.fondovalor.nativeElement.classList.remove('show')
      this.isShowSearch = this.fondovalor.nativeElement.classList.toggle('showSearch')
      this.dataProductDetails = this.productDetails.filter(
        (r: any) => {
          !r.title
            .toLowerCase()
            .search(new RegExp(this.valueInput.toLowerCase()))
        }
      ).slice(0, 5)
      // const remainingLength = Math.min(5, this.productDetails.length - this.dataProductDetails)


    }
  }

  demo() {
    // this.fondovalor.nativeElement.addEventListener("keyup", () => {
    //   if (this.fondovalor.nativeElement.value === "") {
    //     this.handlerShow()
    //   } else {
    //     this.isShow = false
    //   }
    // })

    if (this.fondovalor.nativeElement.value !== "") {
      this.isShow = this.fondovalor.nativeElement.classList.remove('show')
      this.isShowSearch = this.fondovalor.nativeElement.classList.toggle('showSearch')
      this.dataProductDetails = this.productDetails.filter(
        (r: any) =>
          !r.title
            .toLowerCase()
            .search(new RegExp(this.valueInput.toLowerCase()))
      ).slice(0, 5);
      // this.dataProductDetails.match
    } else {
      this.isShowSearch = this.fondovalor.nativeElement.classList.remove('showSearch')
    }
  }

  removeScroll() {
    this.isShow = this.fondovalor.nativeElement.classList.remove('show')
  }

  handlerSearch(item: any) {
    this._router.navigate([`homepage/search/${item}/${0}`]).then(
      resp => {
        this.isShow = this.fondovalor.nativeElement.classList.remove('show')
        window.location.reload()
      }
    )
  }

  handleSelect(pid: any) {
    this._router.navigate(['productViewDetails', {pid: pid}]).then(result => {
      this.isShowSearch = this.fondovalor.nativeElement.classList.remove('showSearch')
      this.fondovalor.nativeElement.value = ""
      window.location.reload()

    })
  }

  clickOutside() {
    this.isShow = this.fondovalor.nativeElement.classList.remove('show')
    this.isShowSearch = this.fondovalor.nativeElement.classList.remove('showSearch')
  }


  clickOutside1() {
    this.isShowNotifications = this.notify.nativeElement.classList.remove("showNotifications")
  }

  deleteCount() {
    this._login.getNotifications()
      .subscribe({
        next: (resp) => {
          console.log(resp)
        }
      })
  }

  handlerNotify() {
    this._router.navigate(['/admin/orderDetails']).then(resp => {
      this.isShowNotifications = this.notify.nativeElement.classList.remove("showNotifications");
    })
  }
}
