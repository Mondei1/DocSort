import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private serverString: string;
  private jwt: string;
  public isLoggedIn: boolean;

  constructor(private http: HttpClient) {
    this.serverString = "http://localhost:9090";
  }

  async login(username, password) {
    const response = await this.http.post(`${this.serverString}/login`, {
      username: username,
      password: password
    });
    this.jwt = this.jwt;
    this.isLoggedIn = true;
  }

  uploadFile(uploadData) {
    //let headers = new Headers();
    //headers.append('token', key);
    console.log("uploadFile was called on api-service");
    this.http.post(`${this.serverString}/uploadSingleDocument`, uploadData, {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders().set('token', this.jwt)
    }).subscribe(event => {
      console.log("event:" + JSON.stringify(event)); // handle event here
    });
  }

  getToken() {
    return this.jwt;
  }
  
}
