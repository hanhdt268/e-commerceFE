import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/_model/product.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{
  product!: Product

constructor(private _activeRoute: ActivatedRoute){}
  ngOnInit(): void {
    this.product = this._activeRoute.snapshot.data['product'];

  }
}
