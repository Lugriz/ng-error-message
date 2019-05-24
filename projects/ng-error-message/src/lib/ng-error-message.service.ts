import { Injectable } from '@angular/core';
import { NgErrorMessageLoader } from './ng-error-message.loader.service';

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
    private _loader: NgErrorMessageLoader
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