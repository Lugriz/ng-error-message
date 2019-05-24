import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Abstract class 
 */
export abstract class NgErrorMessageLoader {
  abstract getDictionary(): Observable<any>;
}

/**
 * Load the json file
 */
export class NgErrorMessageLoaderService implements NgErrorMessageLoader {

  constructor(
    private _http: HttpClient,
    private _dictURl: string
  ) { }

  /**
   * Gets the dictionary json file
   * @param dictUrl the Url of the errors dictionary
   */
  public getDictionary(): Observable<any> {
    if (!/.json$/.test(this._dictURl)) {
      throw `${this._dictURl} must be a json file`;
    }

    return this._http.get(this._dictURl);
  }
}
