import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { IMenu, MenuService } from './menu.service';
import { MenuViewComponent } from './menu-view/menu-view.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  sid: number = 0;
  mid: number = 0;
  menus: Array<IMenu> = [];
  msg: string = '테스트';

  constructor(
    private dialog: MatDialog,
    private mnuSvc: MenuService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.sid = params['sid'];
      console.log(params['mid']);

      this.mid = params['mid'] == null ? 0 : params['mid'];
    });

    this.getMenuList(this.sid);
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      title: 'Angular For Beginners'
    };

    this.dialog.open(MenuViewComponent, dialogConfig);
    
    const dialogRef = this.dialog.open(MenuViewComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => console.log("Dialog output:", data)
    );
  }

  getMenuList(sid: number) {

    // console.log('getMenuList : ', sid);

    if (sid !== null)
    {
      var params = {
        'sid': this.sid
      };

      // console.log('getMenuList-params : ', params);

      this.mnuSvc
          .getMenu(params)
          .subscribe(res => {
            console.log('res:', res);
            this.menus = res as Array<IMenu>;
          });

    }
  }

  getMenu(sid: number, mid: number) {

    // console.log('getMenu : ', sid, mid);

    if (sid !== null)
    {
      var params = {
        'sid': this.sid,
        'mid': this.mid
      };

      // console.log('getMenuList-params : ', params);

      this.mnuSvc
          .getMenuDetail(params)
          .subscribe(res => {
            console.log('res:', res);
            this.menus = res as Array<IMenu>;
          });

    }
  }

}
