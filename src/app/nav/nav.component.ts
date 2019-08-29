import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers : [AuthService]

})
export class NavComponent implements OnInit {

  constructor(private auth: AuthService ) {}
  username = 'noname';

  ngOnInit() {
    // this.userSession = this.auth.userSession
    // if (this.auth.userSession.isUserSignedIn()) {
      this.username = this.auth.userSession.loadUserData().username;
  }
  logOut() {
    this.auth.logout();
  }
  changeFont(font) {
    const usercss = `h1, h2, h3, h4, h5, h6{
      font-family: ${font}`;
    const css = document.createElement('style');
    css.type = 'text/css';
    css.innerHTML = usercss;
    document.body.appendChild(css);

  }
  changeTheme(color) {
    const usercss = `body{
      background-color: ${color} !important`;
    const css = document.createElement('style');
    css.type = 'text/css';
    css.innerHTML = usercss;
    document.body.appendChild(css);
  }
  printView() {
    window.print();
  }
}
