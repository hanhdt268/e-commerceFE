import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-upload-mutiple-file',
  templateUrl: './upload-mutiple-file.component.html',
  styleUrls: ['./upload-mutiple-file.component.css']
})
export class UploadMutipleFileComponent implements OnInit {
  selectedFile!: File[];
  ref!: AngularFireStorageReference;
  url: any = []

  @Output()
  giveUrl = new EventEmitter<string[]>();

  constructor(private afStorage: AngularFireStorage) {
  }

  ngOnInit(): void {
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files;
    this.onUpload();
  }

  onUpload() {
    for (let i = 0; i < this.selectedFile.length; i++) {
      const id = Math.random().toString(32).substring(2);
      this.ref = this.afStorage.ref(id)
      this.ref.put(this.selectedFile[i]).then(data => {
        return data.ref.getDownloadURL()
      }).then(urll => {
        this.url.push(urll)
        this.giveUrl.emit(urll)
      })
    }
  }
}
