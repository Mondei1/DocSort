import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private serverString: string;

  constructor(private http: HttpClient) {
    this.serverString = "http://localhost:3000";
  }

  uploadFile(uploadData) {
    console.log("uploadFile was called on api-service");
    this.http.post(`${this.serverString}/uploadFile`, uploadData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(event => {
      console.log("event:" + event); // handle event here
    });
  }
  
}
