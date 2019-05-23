import { Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Injection token where the dictionary will be alive
 */
export const NG_ERROR_MESSAGE_LOADER = new InjectionToken<string>('NG_ERROR_MESSAGE_LOADER');

/**
 * Load the json file
 */
@Injectable({
  providedIn: 'root'
})
export class NgErrorMessageLoaderService {

  constructor(
    private _http: HttpClient,
    private _dictUrl: string
  ) { }

  /**
   * Gets the dictionary json file
   * @param dictUrl the Url of the errors dictionary
   */
  public getDictionary(): Observable<any> {
    if (!/.json$/.test(this._dictUrl)) {
      throw `${this._dictUrl} must be a json file`;
    }

    return this._http.get(this._dictUrl);
  }
}
