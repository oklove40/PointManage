import { Injectable } from '@angular/core';
import { tap, catchError, map } from 'rxjs/operators';
import { IResponse } from '../common/models/IResponse';
import { environment as ENV } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CmnService } from '../common/services/cmn.service';
import { LoggerService } from '../common/services/logger.service';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private apiUrl: string;
  private readonly baseUrl: string = `${ENV.baseUrl}`;

  constructor(
    private http: HttpClient,
    private _log : LoggerService,
    private cmnSvc: CmnService
    
  ) { 
    this.apiUrl = this.baseUrl; 
  }
 
  getShopInfo(sid: Number) {

    let param = {
      'sid': sid
    };

    let url = `${this.apiUrl}Shop/Info?${this.cmnSvc.convert_obj_to_parameter_string(param)}`;
    
    return this.http.get(url)
      .pipe(
        tap((data: any) => {
          return data as Array<IShop>;
        }),
        catchError((err: HttpErrorResponse) => {
          throw err;
        }),
        map((data: IResponse) => {
          return data.result as Array<IShop>;
        })
      );
  }

}

export interface IShop
{
  shop_idx : number,
  company_num    : string,
  owner_name     : string,
  name           : string,
  phone          : string,
  cell           : string,
  addr1          : string,
  addr2          : string,
  zip            : string,
  shop_master_idx: number,

  email          : string,
  password       : string,
  secret         : string,
  status         : string,
  active_yn      : number
}