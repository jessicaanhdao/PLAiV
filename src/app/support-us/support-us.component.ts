import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-support-us',
  templateUrl: './support-us.component.html',
  styleUrls: ['./support-us.component.css']
})
export class SupportUsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  copyAddress() {
    
    let copyText : any = document.getElementById("btc-address");

    /* Select the text field */
    // copyText.focus();
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/
    /* Copy the text inside the text field */
    document.execCommand('copy');

  
  }
}
