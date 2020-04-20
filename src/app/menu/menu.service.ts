import { Injectable } from '@angular/core';
import { LoggerService } from '../common/services/logger.service';
import { ActivatedRoute } from '@angular/router';
import { environment as ENV } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { IResponse } from '../common/models/IResponse';
import { CmnService } from '../common/services/cmn.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private apiUrl: string;
  private readonly baseUrl: string = `${ENV.baseUrl}`;

  constructor(
    private http: HttpClient,
    private _log : LoggerService,
    private route: ActivatedRoute,
    private cmnSvc: CmnService

    ) { 
      this.apiUrl = this.baseUrl;

    }

  //  목록
  getMenu(param: any) {
    // console.log('param : ', param);

    return this.http.get(`${this.apiUrl}Shop/Menu?${this.cmnSvc.convert_obj_to_parameter_string(param)}`)
      .pipe(
        tap((data: any) => {
          return data as Array<IMenu>;
        }),
        catchError((err: HttpErrorResponse) => {
          throw err;
        }),
        map((data: IResponse) => {
          return data.result as Array<IMenu>;
        })
      );
  }

  getMenuDetail(param: any) {
    console.log('getMenuDetail-param : ', param);

    return this.http.get(`${this.apiUrl}Shop/MenuInfo?${this.cmnSvc.convert_obj_to_parameter_string(param)}`)
      .pipe(
        tap((data: any) => {
          return data as Array<IMenu>;
        }),
        catchError((err: HttpErrorResponse) => {
          throw err;
        }),
        map((data: IResponse) => {
          return data.result as Array<IMenu>;
        })
      );
  }

}

export interface IMenu {
  menu_idx     : number,
  menu_name    : string,
  price        : number,
  sale_price   : number,
  description  : string,
  image_big    : string,
  image_mid    : string,
  image_sml    : string,
  use_yn       : number,
  shop_idx     : number,
  size         : string
}