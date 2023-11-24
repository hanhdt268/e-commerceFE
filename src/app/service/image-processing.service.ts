import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from '../_model/file-handle.model';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor(private _sanitizer: DomSanitizer) { }

  public createImages(product: Object){
    // @ts-ignore
    const productImages: any[] = product.productImages;

    const productImagesToFileHandle: FileHandle[] = [];
    for(let i = 0; i < productImages.length; i++){
      const imageFileData = productImages[i];
      const imageBlob = this.dataURItoBlob(imageFileData.pcyByte, imageFileData.type);

      const imageFile= new File([imageBlob], imageFileData.name, {type: imageFileData.type})

      const finalFileHandle:FileHandle={
          file: imageFile,
          url: this._sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      };
      productImagesToFileHandle.push(finalFileHandle);
    }

    // @ts-ignore
    product.productImages = productImagesToFileHandle;
    return product;
  }

  public dataURItoBlob(picBytes:any, imageType:any){
      const byteString= window.atob(picBytes);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const int8Array = new Uint8Array(arrayBuffer);

      for(let i =0; i<byteString.length; i++){
        int8Array[i] = byteString.charCodeAt(i);
      }

      const blob= new Blob([int8Array], {type: imageType})
      return blob;
  }
}
