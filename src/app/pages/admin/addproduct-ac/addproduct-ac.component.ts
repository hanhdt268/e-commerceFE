import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {FileHandle} from 'src/app/_model/file-handle.model';
import {Product} from 'src/app/_model/product.model';
import {CategoryService} from 'src/app/service/category.service';
import {ManufacturerService} from 'src/app/service/manufacturer.service';
import {ProductService} from 'src/app/service/product.service';
import Swal from 'sweetalert2';
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-addproduct-ac',
  templateUrl: './addproduct-ac.component.html',
  styleUrls: ['./addproduct-ac.component.css']
})
export class AddproductAcComponent implements OnInit {
// @ts-ignore
  formProduct: FormGroup
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
    productEnum: [],
    laptopConfig: {
      cpu: '',
      ram: '',
      hardDrive: '',
      screen: '',
      graphic: '',
      connector: '',
      special: '',
      operatingSystem: '',
      design: '',
      sizeMass: '',
      releaseTime: ''
    },
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
    accessoryConfig: {
      compatible: '',
      resolution: '',
      howToConnect: '',
      wireLength: '',
      typePin: '',
      weight: '',
      brand: '',
      madeIn: '',
      manufacturer: '',
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
      cpu: new FormControl('', [Validators.required]),
      ram: new FormControl('', [Validators.required]),
      hardDrive: new FormControl('', [Validators.required]),
      screen: new FormControl('', [Validators.required]),
      graphic: new FormControl('', [Validators.required]),
      connector: new FormControl('', [Validators.required]),
      special: new FormControl('', [Validators.required]),
      operatingSystem: new FormControl('', [Validators.required]),
      design: new FormControl('', [Validators.required]),
      sizeMass: new FormControl('', [Validators.required]),
      releaseTime: new FormControl('', [Validators.required]),
      // screen: new FormControl('', [Validators.required]),
      beforeCamera: new FormControl('', [Validators.required]),
      afterCamera: new FormControl('', [Validators.required]),
      // ram: new FormControl('', [Validators.required]),
      sim: new FormControl('', [Validators.required]),
      chip: new FormControl('', [Validators.required]),
      // operatingSystem: new FormControl('', [Validators.required]),
      pin: new FormControl('', [Validators.required]),
      storage: new FormControl('', [Validators.required]),
      compatible: new FormControl('', [Validators.required]),
      resolution: new FormControl('', [Validators.required]),
      howToConnect: new FormControl('', [Validators.required]),
      wireLength: new FormControl('', [Validators.required]),
      typePin: new FormControl('', [Validators.required]),
      weight: new FormControl('', [Validators.required]),
      brand: new FormControl('', [Validators.required]),
      madeIn: new FormControl('', [Validators.required]),
      // manufacturer: new FormControl('', [Validators.required]),
      productEnum: new FormControl('ACCESSORY')
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


  addSubmit() {
    // const productFormData = this.prepareFormData(this.product)
    this._product.addProduct(this.product).subscribe({
      next: (data: Product) => {
        Swal.fire('Successfully', 'Add Product Successfully', "success")
        this.formProduct.reset()
        this.product.imgChildren = [];
      },
      error: (error) => {
        Swal.fire('Error', '', "error");
        console.log(error)
      }
    })
  }

  openLoadImage(event: any) {
    console.log(event)
    this.product.images = event
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
    console.log(file)
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
