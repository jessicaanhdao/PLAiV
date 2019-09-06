import { Injectable } from '@angular/core';
import {
  UserSession,
  AppConfig,
  Person
} from 'blockstack';

import { User, configure, getConfig } from 'radiks';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    // 'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  appConfig = new AppConfig(['store_write', 'publish_data']);
  userSession = new UserSession({ appConfig: this.appConfig });
  apiServer = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://plaiv-server.herokuapp.com';

  hi = configure( {
    apiServer: this.apiServer,
    userSession : this.userSession
  } );

  constructor(private router : Router, private http : HttpClient) { }
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
  getPerson() {
    return new Person(this.userSession.loadUserData().profile)
  }

  notiURL = "http://localhost:5000/subscribe"
  // notiURL = "https://plaiv-server.herokuapp.com/subscribe"
  postSubscription(sub : PushSubscription) {
    this.http.post(this.notiURL, sub, httpOptions).subscribe() 
    // .map(res => res.json()) // ...and calling .json() on the response to return data
    // .catch((error:any) => Observable.throw(error.json().error || 'Server error')) //...errors if
    // .subscribe();
  }
}
