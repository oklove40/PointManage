import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoggerService } from './logger.service';
import { BaseParam } from '../models/BaseParam';
import { catchError, tap } from 'rxjs/operators';
import { environment as ENV } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CmnService {

  busy: boolean = false;
  private apiUrl: string;
  private readonly baseUrl: string = `${ENV.baseUrl}`;

  constructor(
    @Inject(HttpClient) protected http: HttpClient,
    private logger: LoggerService,
  ) {
    this.apiUrl = this.baseUrl;
  }

  //  공통코드 목록
  getCommonCodes(param: BaseParam) {
    this.busy = true;
    return this.http.post(`${this.apiUrl}/List`, param)
      .pipe(
        tap((data) => {
          this.logger.log('CodesList', data);
        }),
        catchError((err: HttpErrorResponse) => {
          // this.handleError(err);
          console.log(err);
          throw err;
        })
      );
  }

  convert_obj_to_parameter_string = function(obj) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }
  
}
