import { Component } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private api: ApiService) {
  }

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