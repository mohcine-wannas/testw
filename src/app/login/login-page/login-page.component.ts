import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'app/core/session/session.service';
import { AlertService } from 'app/shared/services/alert.service';
import { ToastService } from 'app/shared/services/toast.service';
import { MessagingService } from '../../admin/services/messaging.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  username: string;
  password: string;
  isLogging = false;
  passwordTouched = false;
  usernameTouched = false;

  isAdmin = true;

  constructor(private loginService: LoginService,
              private router: Router,
              private alert: AlertService,
              private toastService: ToastService,
              private sessionService: SessionService,
              public messagingService: MessagingService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
        if (params['user']) {
          const param = params['user'];
          if (param === 'admin') {
            this.isAdmin = true;
          } else if (param === 'prof') {
            this.isAdmin = false;
          }
        }
      });
  }


  goToRegisterProf() {
    this.router.navigate(['prof/register']);
  }

  enterLogin(event) {
    // enter login
    if (event.keyCode === 13) {
      this.doLogin();
    }
  }

  enterUsername(event) {
    this.usernameTouched = true;
    this.enterLogin(event);
  }

  enterPassword(event) {
    this.passwordTouched = true;
    this.enterLogin(event);
  }

  doLogin() {

    this.isLogging = true;
    this.loginService.login({ 'username': this.username, 'password': this.password }).subscribe(
      resp => this.loginSucceed(resp),
      error => this.showError()
    );
    /*
        try {

          const token: any = await this.loginService.testLogin(this.username, this.password);
          if (token) {
            const decodedToken = this.jwtHelper.decodeToken(token);
            const fullname = `${decodedToken.firstname} ${decodedToken.lastname}`;

            sessionStorage.setItem('token', token);
            sessionStorage.setItem('fullname', 'admin');
            // hide spinner
            this.isLogging = false;
            // redirect to admin module
            this.router.navigate(['admin']);
            this.toastService.success('Bienvenue ' + fullname);
          } else {

          }
        } catch (error) {

        }*/
  }

  loginSucceed(response: any) {
    if (!this.sessionService.create(response)) {
      this.showError();
    } else {
      this.isLogging = false;
      this.messagingService.getPermissison();
      //this.messagingService.tokenRefresh();
      this.toastService.success('Bienvenue ' + +response.user.firstname + ' ' + response.user.lastname, 'Authentifié');
      this.router.navigate(['admin']);
    }
  }

  showError() {
    this.isLogging = false;
    this.alert.error('Login ou mot de passe incorrect', 'Oops !');
  }
}
