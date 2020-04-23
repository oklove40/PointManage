import { LoggerService } from './logger.service';
import { Injectable, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { environment as ENV } from '../../../environments/environment';

const _token_key = "user";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  private userSubject: BehaviorSubject<IUser>;
  public currentUser: Observable<IUser>;

  private headers: HttpHeaders;
  private apiUrl: string;
  private readonly baseUrl: string = `${ENV.baseUrl}`;

  constructor
  (
    private http: HttpClient,
    private logger: LoggerService
  ) {
    // TODO: url 확인
    this.apiUrl = this.baseUrl;
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Content-type', 'application/json');

    this.userSubject = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem(_token_key)));
    this.currentUser = this.userSubject.asObservable();
 
    console.log('apiUrl:', this.apiUrl);
  }

  ngOnDestroy(): void 
  {
    this.userSubject.unsubscribe();
  }

  public get currentUserValue(): IUser 
  {
      return this.userSubject.value;
  }

  public isAuthenticated(): boolean 
  {
      return !!this.userSubject.value;
  }

  public check()
  {
    this.logger.log("auth.check");

    //  TODO: 작업중
    
    this.headers.append('Authorization', this.currentUserValue.token);

    console.log('headers : ', this.headers);

    console.log('currentUserValue.token : ', this.currentUserValue.token);

    return this.http.get(this.apiUrl + 'LoginTokenCheck', { headers: this.headers })
            .pipe(
              tap((data) => console.log('check:', data)),
              map((res: any) => {
                const sid = res.message;

                console.log('check-sid:', sid);

                return sid;
              })
            );
  }

  public login(email: string, password: string, remeberMe: boolean = false) 
  {
    this.logger.log("Signing in as: " + email);
    let data = <ITokenRequest>{
        email: email,
        password: password,
        grantType: GrantType.password,
        refreshToken: '',
    }

    return this.http.post(this.apiUrl + 'Login', data, { headers: this.headers })
        .pipe(
            tap((data) => console.log(data)),
            map((res: any) => {
                const user = res.result;
                this.handleTokenResponse(user);
                return user;
            }));
  }

  public extendToken() 
  {
    let data = <ITokenRequest>{
        email: this.currentUserValue.email,
        password: '',
        grantType: GrantType.refresh,
        refreshToken: this.currentUserValue.refresh_token,
    };

    return this.http.post(this.apiUrl, data, { headers: this.headers })
        .pipe(map((user: any) => {
            this.handleTokenResponse(user);
            return user;
        }));
  }

  private handleTokenResponse(user: any) 
  {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.clear();

      localStorage.setItem(_token_key, JSON.stringify(user));
      this.userSubject.next(user as IUser);
      this.logger.log('currentUser', this.currentUserValue);
  }

  public logout() 
  {
      // remove user from local storage to log user out
      localStorage.removeItem(_token_key);
      this.userSubject.next(null);
      this.logger.log("Log out");
  }

}

export interface IUser {
  token: string;
  refresh_token: string;
  expires_in: number;
  name: string;
  email: string;
  password: string;
}

export interface ITokenRequest {
  email: string,
  password: string,
  grantType: GrantType,
  refreshToken: string,
}

export enum GrantType {
  password = "password",
  refresh = "refresh"
}