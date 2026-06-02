import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {WordInterface} from "./types/word.interface";
import {Try} from "./slovko/slovko.component";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SlovkoService {

  baseUrl = environment.baseUrl;

  constructor(
    private  http: HttpClient
  ) { }

  getWords(): Observable<WordInterface[]> {
    return this.http.get<WordInterface[]>(`${this.baseUrl}/words`);
  }

  sendFilter(requestBody: Try[]) : Observable<WordInterface[]> {
    return this.http.post<WordInterface[]>(`${this.baseUrl}/words/filtered`, requestBody);
  }
}
