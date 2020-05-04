import { ShopService, IShop } from './shop.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../common/services/auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CmnService } from '../common/services/cmn.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  sid: number = 0;
  shopInfo: Array<IShop> = [];
  shop: IShop = null;

  constructor(
    private authSvc: AuthService,
    private shopSvc: ShopService
  ) {

  }

  ngOnInit(): void {
    this.authSvc.getShop()
                      .subscribe(res => {
                        // console.log('res:', res);
                        this.sid = Number(res.message);
                        this.shopSvc
                          .getShopInfo(this.sid)
                          .subscribe(res => {
                            if(res != null)
                            {
                              this.shop = res[0];
                            }
                          });
                      });
  }


}
