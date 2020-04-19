import { Injectable } from '@angular/core';
import { IException } from '../models/IException';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  isProduction = true;
  bostonException: IException = null;

  constructor() {
    this.isProduction = environment.production;
  }

  log(message: any, ...optionalParams: any[]) {
    if (this.isProduction) {
      return;
    }

    if (!optionalParams) {
      console.log(message);
    } else {
      console.log(message, optionalParams);
    }
  }

  logStringify(message: any, ...optionalParams: any[]) {
    if (this.isProduction) {
      return;
    }

    if (!optionalParams) {
      console.log(message);
    } else {
      // https://developer.mozilla.org/en-US/docs/Web/API/Console/log
      // to show the value of at the moment.
      console.log(message, JSON.stringify(optionalParams));
    }
  }

  error(message: any) {
    console.error(message);
  }

  warn(message: any) {
    if (!this.isProduction) {
      return;
    }
    console.warn(message);
  }
}
