import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoggerService } from './logger.service';
import { BaseParam } from '../models/BaseParam';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CmnService {

  busy: boolean = false;
  cmnApiUrl: string;

  constructor(
    @Inject(HttpClient) protected http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private logger: LoggerService,
  ) {
    this.cmnApiUrl = `${baseUrl}api/Codes`;
  }

  //  공통코드 목록
  getCommonCodes(param: BaseParam) {
    this.busy = true;
    return this.http.post(`${this.cmnApiUrl}/List`, param)
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
  
}
