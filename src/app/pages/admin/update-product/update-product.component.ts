import {Component} from '@angular/core';
import Swal from "sweetalert2";
import {Product} from "../../../_model/product.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ProductService} from "../../../service/product.service";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {ManufacturerService} from "../../../service/manufacturer.service";
import {CategoryService} from "../../../service/category.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductEnum} from "../../../_model/productEnum";
import {FileHandle} from "../../../_model/file-handle.model";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {

  isNewProduct = true;
  categories: any = []

  manufacturers: any = []


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
    productImages: [],
    // @ts-ignore
    productEnum: [],
    accessoryConfig: {
      compatible: '',
      resolution: '',
      howToConnect: '',
      wireLength: '',
      typePin: '',
      weight: '',
      brand: '',
      madeIn: '',
      manufacturer: ''
    },
    smartPhoneConfig: {
      screen: '',
      beforeCamera: '',
      afterCamera: '',
      ram: '',
      sim: '',
      chip: '',
      pin: '',
      operatingSystem: '',
      storage: ''
    },
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
    manufacturer: {
      manuId: '',
    },
    category: {
      cateId: '',
    }
  }


  constructor(private _snack: MatSnackBar, private _product: ProductService,
              private _sanitizer: DomSanitizer, private _activeRoute: ActivatedRoute,
              private _categories: CategoryService,
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
      productEnum: new FormControl('', [Validators.required])
    })
    this._categories.categories().subscribe({
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
    switch (String(ProductEnum.LAPTOP)) {
      case "LAPTOP":
        console.log('LAPTOP')
        this.addSubmit()
        break
      default:
        throw new Error("handler test")
    }
  }

  openLoadImage(event: any) {
    console.log(event)
    this.product.images = event
  }

  addSubmit() {
    // const productFormData = this.prepareFormData(this.product)
    this._product.updateProduct(this.product).subscribe({
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
    const url = this.delete(file);
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
