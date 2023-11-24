import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  selectedFile!: File;
  ref!: AngularFireStorageReference;
  downloadUrl!: string

  @Output()
  giveUrlToCreate = new EventEmitter<string>();

  constructor(private afStorage: AngularFireStorage) {
  }

  ngOnInit(): void {
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    const id = Math.random().toString(32).substring(2);//tao ra 1 name rieng cho db firebase
    this.ref = this.afStorage.ref(id);
    this.ref.put(this.selectedFile).then(snapshot => {
      return snapshot.ref.getDownloadURL();//tra ve 1 chuoi van ban tren db
    }).then(downloadUrl => {
      this.downloadUrl = downloadUrl;
      this.giveUrlToCreate.emit(this.downloadUrl);
      return downloadUrl;
    })
      .catch(error => {
        console.log(error)
      })

  }
}
