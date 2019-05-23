import { Component } from '@angular/core';
import { NgErrorMessageService } from '../../projects/ng-error-message/src/public_api'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public obj: any = { maxlength: true };

  constructor(
    private _errMsgSrv: NgErrorMessageService
  ) {
    this._errMsgSrv.load();
  }

  change() {
    this.obj = (this.obj.maxlength) ? { minlength: true } :{ maxlength: true };
  }

}
