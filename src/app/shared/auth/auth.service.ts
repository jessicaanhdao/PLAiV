import { Injectable } from '@angular/core';
import {
  UserSession,
  AppConfig
} from 'blockstack';

import { User, configure, getConfig } from 'radiks';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
// headers.append("Access-Control-Allow-Methods","GET, POST");
// headers.append("Access-Control-Allow-Origin","*");

export class AuthService {
  appConfig = new AppConfig(['store_write', 'publish_data']);
  userSession = new UserSession({ appConfig: this.appConfig });
  apiServer = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://plaiv-server.herokuapp.com';

  hi = configure( {
    apiServer: this.apiServer,
    userSession : this.userSession
  } );

  constructor(private router : Router) { }
  isLoggedIn = false;
  login() {
    this.userSession.redirectToSignIn();
  }
  logout() {
    this.userSession.signUserOut(window.location.origin);
    this.isLoggedIn = false;
  }
  async handleSignedIn() {
    if (this.userSession.isSignInPending()) {
      await this.userSession.handlePendingSignIn().then(() => {
        this.router.navigate([''])
        console.log('hi signing u in...');
        this.isLoggedIn = true;
      });
      await User.createWithCurrentUser();
    } else if (this.userSession.isUserSignedIn()) {
      console.log('hi u signed in...');
      this.isLoggedIn = true;
    }
    return this.isLoggedIn;
  }
  setLoggedIn(value: boolean) {
    this.isLoggedIn = value;
  }
  async getLoggedIn() {
    return await this.handleSignedIn();
  }
}
