import { Component } from '@angular/core';
import { IUser, AuthService } from './common/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PointManage';
  currentUser: IUser;

  constructor(
    private authSvc: AuthService
  ) {
    this.authSvc
      .currentUser
      .subscribe((user: IUser) => {
        this.currentUser = user;
      });
  }

  logout() {
    this.authSvc.logout();
    alert('로그아웃 되었습니다.');
  }

}
