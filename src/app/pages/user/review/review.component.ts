import {Component, Inject, OnInit} from '@angular/core';
import {ReviewModel} from "../../../_model/review.model";
import {ProductService} from "../../../service/product.service";
import {ActivatedRoute} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import Swal from "sweetalert2";
import {OrderService} from "../../../service/order.service";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  stars = [1, 2, 3, 4, 5];
  // @ts-ignore
  product?: Product
  productDetails: any = []
  status: string = "All"
  myOrderDetails: any = []
  reviews: ReviewModel = {
    content: '',
    value: 0,
    image: '',
    dateCreate: new Date()
  }

  constructor(private _product: ProductService, private _activeRoute: ActivatedRoute,
              public dialog_ref: MatDialogRef<ReviewComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private _dialog: MatDialog,
              private _order: OrderService) {
  }

  ngOnInit(): void {
    // this.product = this._activeRoute.snapshot.data['product'];
    console.log(this.data.pid)
    this.getProductById();

  }

  omSubmit() {
    // console.log(pId)
    this._product.createRating(this.data.pid, this.data.orderDetailsId, this.reviews).subscribe({
      next: (resp) => {
        // console.log(resp)
        // @ts-ignore
        this.updateRating(this.reviews.value) === resp.value
        this._order.markOrderAsReviewsProduct(this.data.oderId).subscribe({
          next: (resp: any) => {
            console.log(resp)

            // this.getOderDetails(this.status);
          }
        })
        this.closeDialog();
        window.location.reload();
        Swal.fire('Success', '', "success")
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  getProductById() {
    this._product.getProductById(this.data.pid).subscribe({
      next: (resp: any) => {
        this.product = resp
        console.log(resp);
        console.log(this.data.pid)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  updateRating(r: number) {
    this.reviews.value = r
    console.log(r)
  }

  closeDialog() {
    this._dialog.closeAll();
  }

  openLoadImage(event: any) {
    console.log(event)
    this.reviews.image = event;
  }
}
