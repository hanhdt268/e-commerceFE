import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../service/product.service";

@Component({
  selector: 'app-manage-review',
  templateUrl: './manage-review.component.html',
  styleUrls: ['./manage-review.component.css']
})
export class ManageReviewComponent implements OnInit {
  reviews: any = []
  displayedColumns: string[] = ['Id', 'Product Image', 'Product Name', 'Product ActualPrice', 'Actions'];
  page: number = 0;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];
  pageNumber = 0;

  constructor(private _product: ProductService) {
  }

  ngOnInit(): void {
    this.getReviews();
  }


  getReviews() {
    this._product.getReviews().subscribe({
      next: (resp: any) => {
        console.log(resp)
        this.reviews = resp.reverse()
      }
    })
  }

  canActive(reId: any) {
    this._product.inActive(reId).subscribe({
      next: (resp) => {
        this.getReviews();
      }
    })
  }

  active(reId: any) {
    this._product.updateReview(reId).subscribe({
      next: (resp) => {
        this.getReviews();
      }
    })
  }

  onTableDataChange(event: any) {
    this.pageNumber = event;
    this.getReviews();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.pageNumber = 1;
    this.getReviews();
  }

}
