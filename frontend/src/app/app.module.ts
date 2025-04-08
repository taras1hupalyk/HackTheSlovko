import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlovkoComponent } from './slovko/slovko.component';
import {CommonModule} from "@angular/common";
import { WordlistComponent } from './wordlist/wordlist.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({ declarations: [
        AppComponent,
        SlovkoComponent,
        WordlistComponent,
        LoadingSpinnerComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        CommonModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
