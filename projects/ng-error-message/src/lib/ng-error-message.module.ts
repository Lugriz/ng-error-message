import { NgModule, ModuleWithProviders, FactoryProvider } from '@angular/core';
import { NgErrorMessagePipe } from './ng-error-message.pipe';
import { NgErrorMessageService } from './ng-error-message.service';


@NgModule({
  declarations: [NgErrorMessagePipe],
  exports: [NgErrorMessagePipe]
})
export class NgErrorMessageModule { 

  /**
   * starts the services
   * @param dictUrl The errors dictionary Url
   */
  static forRoot(jsonProvider: FactoryProvider): ModuleWithProviders {
    
    return {
      ngModule: NgErrorMessageModule,
      providers: [
        jsonProvider,
        NgErrorMessageService
      ]
    };
  }
  
}