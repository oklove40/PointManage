import { LoggerService } from './../common/services/logger.service';
import { AuthService } from './../common/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signInForm: FormGroup;
  returnUrl: string;
  loading: boolean = false;
  failed: boolean = false;

  constructor(
    private authSvc: AuthService,
    private logger: LoggerService,
    private route: ActivatedRoute,
    private router: Router,
  ) { 
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  get email() {
    return this.signInForm.get('email');
  }

  get password() {
    return this.signInForm.get('password');
  }

  submit() {
    if (this.signInForm.valid) {
      this.authSvc.login(this.signInForm.value.email, this.signInForm.value.password)
      .pipe(first())
      .subscribe(res => {
        this.logger.log('auth.result', res);
        if (res) {
          alert('로그인에 성공하였습니다');
          this.router.navigate([this.returnUrl]);
        } else {
          this.failed = true;
          alert('로그인에 실패하였습니다 - ');
        }
      }, err => this.logger.error(err));
    }
  }

}
