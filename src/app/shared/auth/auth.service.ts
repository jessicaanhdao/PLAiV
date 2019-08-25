import { Injectable } from '@angular/core';
import * as blockstack from 'blockstack'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(){
    blockstack.redirectToSignIn();
  }
  logout(){
    blockstack.signUserOut(window.location.origin)
  }
}
