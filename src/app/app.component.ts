import { Component } from '@angular/core';
import { AuthService } from './shared/auth/auth.service';
import { User } from 'radiks';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers : [AuthService]

})
export class AppComponent {
  title = 'planner';

  constructor(public auth : AuthService, private router : Router){

  }

  ngOnInit(){
    if(this.auth.handleSignedIn()) {
      this.router.navigate([''])

    }
    // if () {
    // }
  }
  ngAfterContentChecked() {
    // if(this.auth.handleSignedIn()){
      // this.router.navigate([''])
    // }
  }
}
