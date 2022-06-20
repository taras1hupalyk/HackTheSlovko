import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SlovkoService {

  constructor(
    private  http: HttpClient
  ) { }



  getMostCommon(){
    return this.http.get("https://localhost:1488/api/most-common");
  }
}
