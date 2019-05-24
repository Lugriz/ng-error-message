import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgErrorMessageModule, NgErrorMessageLoaderService, NgErrorMessageLoader } from '../../projects/ng-error-message/src/public_api';

export function loaderFun (http: HttpClient) {
    return new NgErrorMessageLoaderService(http, 'assets/errors/' + navigator.language + '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgErrorMessageModule.forRoot(
      {
        provide: NgErrorMessageLoader,
        useFactory: loaderFun,
        deps: [HttpClient]
      }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }