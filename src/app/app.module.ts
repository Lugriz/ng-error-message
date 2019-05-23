import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgErrorMessageModule } from '../../projects/ng-error-message/src/lib/ng-error-message.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgErrorMessageModule.forRoot(`assets/errorss/${ navigator.language }.json`)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
