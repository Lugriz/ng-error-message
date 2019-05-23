import { Pipe, PipeTransform } from '@angular/core';
import { NgErrorMessageService } from './ng-error-message.service';

@Pipe({
  name: 'errorMessage',
  pure: false
})
export class NgErrorMessagePipe implements PipeTransform {

  /**
   * Saves the untransformed message
   */
  private _cachedCleanMessage: string = null;

  /**
   * Saves the transformed message
   */
  private _cachedTransformedMessage: string = null;

  constructor(
    private _errorMessageSrv: NgErrorMessageService
  ) {}

  transform(errors: any, args: any = {}): any {

    if ( !errors || typeof errors !== 'object' || Array.isArray(errors) || typeof args !== 'object' || Array.isArray(args)) return null;

    const errKey: string = Object.keys( errors )[ 0 ]; // The first found error
    const errArgs: any = args[ errKey ];
    let msg: string = errKey !== undefined && this._errorMessageSrv.errors[ errKey ] || null;
    
    if (this._cachedCleanMessage === msg) {
      return this._cachedTransformedMessage;
    }

    this._cachedCleanMessage = msg;

    if (msg) {
      for (let p in errArgs) {
        msg = msg.replace(new RegExp("{{\\s?" + p + "\\s?}}", 'g'), errArgs[p]);
      }
    }

    this._cachedTransformedMessage = msg;

    return msg;
  }

}