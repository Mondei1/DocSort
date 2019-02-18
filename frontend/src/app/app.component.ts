import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'docSortGui';
  selectedFile: File;

  onFileChanged(event) {
    console.log("onFileChanged was called:" + JSON.stringify(event));
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    /*this.http.post('my-backend.com/file-upload', uploadData, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        console.log(event); // handle event here
      });*/
  }
}
