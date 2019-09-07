import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  // providers : [AuthService]

})
export class NavComponent implements OnInit {
  @Output() menuEvent : EventEmitter<boolean> = new EventEmitter();

  constructor(private auth: AuthService ) {}
  username = '';
  username_first = '<No Username>'
  username_last = 'id.blockstack'
  name = 'PLAiVner'
  avatarUrl = ''
  ngOnInit() {
      this.username = this.auth.username;
      this.name = this.auth.name;
      this.avatarUrl = this.auth.avatarUrl;
      this.splitusername()

  }
  splitusername() {
    var splits = this.username.split('.');
    this.username_first = splits[0];
    this.username_last ;
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
  menuOpen = false
  openMenu() {
    this.menuOpen = true
    this.menuEvent.emit(this.menuOpen)
  }
  closeMenu() {
    this.menuOpen = false
    this.menuEvent.emit(this.menuOpen)
  }
}
