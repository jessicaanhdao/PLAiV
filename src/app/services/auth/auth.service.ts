import { Injectable } from '@angular/core';
import {
  UserSession,
  AppConfig,
  Person
} from 'blockstack';

import { User, configure, getConfig } from 'radiks';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable, Subject, BehaviorSubject } from 'rxjs';
import { catchError } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
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
  isLoggedIn = new Subject<boolean>();
  name = 'PLAiV User'
  username = ''
  avatarUrl = './assets/photos/plaiv_avatar.jpg'
  usertype = ''
  login() {
    this.userSession.redirectToSignIn();
  }
  tryWithoutLogin() {
    console.log("try without login")
    this.isLoggedIn.next(true);
    this.usertype = 'LOCAL'
    this.router.navigate(['/'])
    // return true;
  }
  logout() {
    this.setLoggedIn(false)
    this.userSession.signUserOut(window.location.origin);
  }
  async handleSignedIn() {
    if (this.userSession.isSignInPending()) {
      await this.userSession.handlePendingSignIn().then(() => {
        this.router.navigate([''])
        console.log('hi signing u in...');
        this.setLoggedIn(true);
      });
      await User.createWithCurrentUser();
      this.usertype = 'BLOCKSTACK'
    } else if (this.userSession.isUserSignedIn()) {
      console.log('hi u signed in...');
      this.setLoggedIn(true);
      this.usertype = 'BLOCKSTACK'

    }
    this.setProfileInfo();
    return this.isLoggedIn;
  }
  setLoggedIn(value: boolean) {
    this.isLoggedIn.next(value);
  }
  getLoggedIn() : Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }
  getPerson() {
    return new Person(this.userSession.loadUserData().profile)
  }

  notiURL = "http://localhost:5000/subscribe"
  // notiURL = "https://plaiv-server.herokuapp.com/subscribe"
  postSubscription(sub : PushSubscription) {
    this.http.post(this.notiURL, sub, httpOptions).subscribe() 
  }

  setProfileInfo() {
    if(this.usertype === 'BLOCKSTACK') {
      let person = new Person(this.userSession.loadUserData().profile);
      this.name = person.name();
      this.avatarUrl = person.avatarUrl()
      this.username = this.userSession.loadUserData().username;
    }
  }
}
