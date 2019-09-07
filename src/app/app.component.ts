import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { User } from 'radiks';
import { Router } from '@angular/router';
import { SwPush, SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers : [AuthService]

})
export class AppComponent implements OnInit {
  title = 'PLAiV';
  readonly VAPID_PUBLIC_KEY = 'BDIgSI3mEOj_oLkpJcMINqVhKqFNfZ0gI9Eg7J7pDQeaA9aYWY_BO4ZUKjf9BcmHXyMRoeWPClLtUY46OFV7qrA'
  isLoggedIn = true;
  constructor(public auth: AuthService, private router: Router,
            readonly swPush: SwPush,
            private swUpdate : SwUpdate
            ) {
    this.auth.handleSignedIn() 
    //  this.auth.tryWithoutLogin()
    
  }
  subscribeToNotifications() {
    // if (this.swUpdate.isEnabled){
      this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
      })
      .then(sub => {  
        this.auth.postSubscription(sub)
        console.log("subbed "+JSON.stringify(sub))})
      .catch(sub => console.log("rejected "+JSON.stringify(sub)))
  }

  ngOnInit() {
    this.auth.getLoggedIn().subscribe(value => {
      console.log("is log in? "+value)
  
        // this.isLoggedIn = value;
      })
    this.subscribeToNotifications()
  }
  menuOpen = false
  receiveMenuEvent($event) {
    this.menuOpen = $event
    console.log("evnet "+$event)
  }

}
