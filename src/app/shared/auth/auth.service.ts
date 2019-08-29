import { Injectable } from '@angular/core';
import {
  UserSession,
  AppConfig
} from 'blockstack';

import { User, configure, getConfig } from 'radiks';

@Injectable({
  providedIn: 'root'
})
// headers.append("Access-Control-Allow-Methods","GET, POST");
// headers.append("Access-Control-Allow-Origin","*");

export class AuthService {
  appConfig = new AppConfig(['store_write', 'publish_data']);
  userSession = new UserSession({ appConfig: this.appConfig });
  config = {
    apiServer: 'http://localhost:5000',
    userSession : this.userSession
  };
  hi = configure( {
    apiServer: 'http://localhost:5000',
    userSession : this.userSession
  } );

  constructor() { }
  isLoggedIn = false;
  login() {
    this.userSession.redirectToSignIn();
    // this.loggedIn = this.userSession.isUserSignedIn();
  }
  logout() {
    this.userSession.signUserOut(window.location.origin);
    this.isLoggedIn = false;
  }
  async handleSignedIn() {
    // this.userSession = getConfig();
    if (this.userSession.isSignInPending()) {
      await this.userSession.handlePendingSignIn().then(() => {
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
