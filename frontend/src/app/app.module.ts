import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlovkoComponent } from './slovko/slovko.component';
import {CommonModule} from "@angular/common";
import { WordlistComponent } from './wordlist/wordlist.component';

@NgModule({
  declarations: [
    AppComponent,
    SlovkoComponent,
    WordlistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
