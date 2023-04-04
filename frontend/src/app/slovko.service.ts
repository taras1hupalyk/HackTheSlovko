import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {WordInterface} from "./types/word.interface";
import {Try} from "./slovko/slovko.component";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SlovkoService {

  baseUrl = environment.baseUrl;
  data: WordInterface[] = [];
  constructor(
    private  http: HttpClient
  ) { }



  getFiveLettersWords(){
    this.http.get<WordInterface[]>("${this.baseUrl}/words/five-letters")
      .subscribe((data : WordInterface[]) => {
        console.log('res', data)
      this.data = data});



    return this.data;
  }

  SendFilter(requestBody: Try[]) : Observable<WordInterface[]> {
    return this.http.post<WordInterface[]>(`${this.baseUrl}/words/filtered`, requestBody);
  }
}
