import { Component } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'docSortGui';
  selectedFile: File;
  uploadTitle: string = "";
  note: string = "";
  tags: string = "";

  constructor(private api: ApiService) {
  }

  onFileChanged(event) {
    console.log("onFileChanged was called:" + JSON.stringify(event));
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    this.api.uploadFile({
      singleDocument: this.selectedFile,
      title: this.uploadTitle,
      note: this.note,
      tags: this.tags
    });
    /*this.http.post('http://127.0.0.1:9090/uploadSingleDocument', {
      singleDocument: this.selectedFile,
      title: this.uploadTitle,
      note: this.note,
      tags: this.tags
    }, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        console.log(event); // handle event here
      });*/
  }
}