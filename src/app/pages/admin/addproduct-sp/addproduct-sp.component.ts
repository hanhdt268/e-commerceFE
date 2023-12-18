import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {FileHandle} from 'src/app/_model/file-handle.model';
import {Product} from 'src/app/_model/product.model';
import {ProductEnum} from 'src/app/_model/productEnum';
import {CategoryService} from 'src/app/service/category.service';
import {ManufacturerService} from 'src/app/service/manufacturer.service';
import {ProductService} from 'src/app/service/product.service';
import Swal from 'sweetalert2';
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-addproduct-sp',
  templateUrl: './addproduct-sp.component.html',
  styleUrls: ['./addproduct-sp.component.css']
})
export class AddproductSpComponent implements OnInit {

  // @ts-ignore
  formProduct: FormGroup

  valueInput: string = "SMARTPHONE"
  product: Product = {
    // @ts-ignore
    pid: null,
    title: '',
    description: '',
    config: '',
    price: 0,
    discountPrice: 0,
    images: '',
    active: true,
    quantum: 0,
    imgChildren: [],
    // @ts-ignore
    productEnum: [],
    smartPhoneConfig: {
      screen: '',
      beforeCamera: '',
      afterCamera: '',
      ram: '',
      chip: '',
      sim: '',
      operatingSystem: '',
      pin: '',
      storage: ''
    },
    manufacturer: {
      manuId: '',
    },
    category: {
      cateId: '',
    }
  }
  isNewProduct = true;
  categories: any = []

  manufacturers: any = []

  constructor(private _snack: MatSnackBar, private _product: ProductService,
              private _sanitizer: DomSanitizer, private _activeRoute: ActivatedRoute,
              private _categoriess: CategoryService,
              private _manufacturer: ManufacturerService,
              private _fb: FormBuilder,
              private afStorage: AngularFireStorage) {
  }

  ngOnInit(): void {
    this.formProduct = this._fb.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      config: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      active: new FormControl('', [Validators.required]),
      quantum: new FormControl('', [Validators.required]),
      discountPrice: new FormControl('', [Validators.required]),
      manufacturer: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      screen: new FormControl('', [Validators.required]),
      beforeCamera: new FormControl('', [Validators.required]),
      afterCamera: new FormControl('', [Validators.required]),
      ram: new FormControl('', [Validators.required]),
      sim: new FormControl('', [Validators.required]),
      chip: new FormControl('', [Validators.required]),
      operatingSystem: new FormControl('', [Validators.required]),
      pin: new FormControl('', [Validators.required]),
      storage: new FormControl('', [Validators.required]),
      productEnum: new FormControl('SMARTPHONE')
    })
    this._categoriess.categories().subscribe({
      next: (data: any) => {
        this.categories = data;
        console.log(data)
      },
      error: (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading data from serve', 'error')
      }
    });
    this._manufacturer.getAllManufacturer().subscribe({
      next: (data: any) => {
        this.manufacturers = data;
        console.log(data)
      },
      error: (error) => {
        console.log(error)
      }
    })
    this.product = this._activeRoute.snapshot.data['product'];
    if (this.product && this.product.pid) {
      this.isNewProduct = false;
    }
  }

  handle() {
    switch (String(ProductEnum.SMARTPHONE)) {
      case "SMARTPHONE":
        console.log('SMARTPHONE')
        this.addSubmit()
        break
      default:
        throw new Error("test")
    }
  }

  openLoadImage(event: any) {
    console.log(event)
    this.product.images = event
  }

  addSubmit() {
    // const productFormData = this.prepareFormData(this.product)
    this._product.addProduct(this.product).subscribe({
      next: (data: Product) => {
        Swal.fire('Successfully', 'Add Product Successfully', "success")
        this.formProduct.reset()
        this.product.imgChildren = [];
        this.product.images = ''
      },
      error: (error) => {
        Swal.fire('Error', '', "error");
        console.log(error)
      }
    })
  }


  // prepareFormData(product: Product): FormData {
  //   const formData = new FormData();
  //   formData.append(
  //     'product',
  //     new Blob([JSON.stringify(product)], {type: 'application/json'}),
  //   );
  //   for (var i = 0; i < product.productImages.length; i++) {
  //     formData.append(
  //       'imageFile',
  //       product.productImages[i].file,
  //       product.productImages[i].file.name
  //     )
  //   }
  //   return formData;
  // }

  onFileSelected(event: any) {
    // console.log(event)
    if (event.target.files) {
      const file = event.target.files[0];
      console.log(window.URL.createObjectURL(file))
      const fileHandle: FileHandle = {
        file: file,
        url: this._sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }
      // @ts-ignore
      this.product.imgChildren.push(fileHandle);
    }


    // console.log(this.product.productImages.length)
    // console.log(this.product.productImages)

    //   let reader = new FileReader();
    // reader.onload = (e) =>{
    //  this.rsultImage = e.target?.result ? e.target?.result.toString() : "";
    // }
    // reader.readAsDataURL(file);
  }

  removeImage(file: any, i: number) {
    this.product.imgChildren.splice(i, 1);
    const url = this.delete(file)
    console.log(url)
  }

  async delete(url: any) {
    return this.afStorage.storage.refFromURL(url).delete();
  }

  downloadUrl(event: string[]) {
    // @ts-ignore
    this.product.imgChildren.push(event)
    console.log(this.product.imgChildren)
  }
}
