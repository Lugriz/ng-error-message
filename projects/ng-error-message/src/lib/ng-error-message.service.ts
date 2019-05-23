import { Injectable, Inject } from '@angular/core';
import { NG_ERROR_MESSAGE_LOADER, NgErrorMessageLoaderService } from './ng-error-message.loader.service';

/**
 * Service for serving the errors dictionary
 */
@Injectable({
  providedIn: 'root'
})
export class NgErrorMessageService {

  /**
   * Contains the dictionary of errors
   */
  private _errors: any = {};

  get errors(): any {
    return this._errors;
  }

  constructor(
    @Inject(NG_ERROR_MESSAGE_LOADER) private _loader: NgErrorMessageLoaderService
  ) {}

  /**
   * Loads the dictionary
   */
  public load(): void{
    this._loader.getDictionary().subscribe( dict => {
      this._errors = dict;
    });
  }

}