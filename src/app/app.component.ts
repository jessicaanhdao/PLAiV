import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth/auth.service';
import { User } from 'radiks';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers : [AuthService]

})
export class AppComponent implements OnInit {
  title = 'PLAiV';

  constructor(public auth: AuthService, private router: Router) {
    this.auth.handleSignedIn()
  }

  ngOnInit() {
    // if () {
    // }
  }

}
