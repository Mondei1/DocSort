import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {
  }

  onFileChanged(event) {
    console.log("onFileChanged was called:" + JSON.stringify(event));
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    this.http.post('http://127.0.0.1:9090/uploadSingleDocument', {
      singeDocuemnt: this.selectedFile,
      title: this.uploadTitle,
      note: this.note,
      tags: this.tags
    }, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        console.log(event); // handle event here
      });
  }
}
