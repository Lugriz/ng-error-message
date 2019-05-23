import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgErrorMessagePipe } from './ng-error-message.pipe';
import { NgErrorMessageLoaderService, NG_ERROR_MESSAGE_LOADER } from './ng-error-message.loader.service';
import { NgErrorMessageService } from './ng-error-message.service';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [NgErrorMessagePipe],
  exports: [NgErrorMessagePipe]
})
export class NgErrorMessageModule { 

  /**
   * starts the services
   * @param dictUrl The errors dictionary Url
   */
  static forRoot(dictUrl: string): ModuleWithProviders {

    return {
      ngModule: NgErrorMessageModule,
      providers: [
        {
          provide: NG_ERROR_MESSAGE_LOADER,
          useFactory: (http: HttpClient) => {
            return new NgErrorMessageLoaderService(http, dictUrl);
          },
          deps: [HttpClient]
        },
        NgErrorMessageService
      ]
    };
  }
  
}