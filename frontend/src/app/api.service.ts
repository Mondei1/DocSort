import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private serverString: string;

  constructor(private http: HttpClient) {
    this.serverString = "http://localhost:9090";
  }

  uploadFile(uploadData) {
    // temp
    let key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsImlhdCI6MTU1MDg2NTE2MCwiZXhwIjoxNTUwOTUxNTYwfQ.AA6w3cySt18glTtxDLmhCV4OzJkH13EIQbr4dTSWf8E";
    //let headers = new Headers();
    //headers.append('token', key);
    console.log("uploadFile was called on api-service");
    this.http.post(`${this.serverString}/uploadSingleDocument`, uploadData, {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders().set('token', key)
    }).subscribe(event => {
      console.log("event:" + JSON.stringify(event)); // handle event here
    });
  }
  
}
