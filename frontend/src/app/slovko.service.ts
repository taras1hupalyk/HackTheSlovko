import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {WordInterface} from "./types/word.interface";
import {Try} from "./slovko/slovko.component";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SlovkoService {

  data: WordInterface[] = [];
  constructor(
    private  http: HttpClient
  ) { }



  getFiveLettersWords(){
    this.http.get<WordInterface[]>("http://localhost:5000/api/words/five-letters")
      .subscribe((data : WordInterface[]) => {
        console.log('res', data)
      this.data = data});



    return this.data;
  }

  SendFilter(requestBody: Try[]) : Observable<WordInterface[]> {
    return this.http.post<WordInterface[]>("http://localhost:5000/api/words/filtered", requestBody);
  }
}
