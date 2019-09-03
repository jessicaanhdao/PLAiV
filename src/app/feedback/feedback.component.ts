import { Component, OnInit } from '@angular/core';
import FeedBack from '../models/feedback';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  textarea = ''
  constructor() { }

  ngOnInit() {
  }
  async sendFeedback() {
    console.log("feedback "+this.textarea)
    let FeedBackModel : any = FeedBack;
    const fb = new FeedBackModel({
      message : this.textarea
    })
    try {
      await fb.save();
      let post = document.getElementById('postSubmit');
      post.innerHTML='Thank you for your feedback!';
      post.style.color='#00c4cf';
    } catch(e) {
      console.error(`Cannot send feedback : ${e.message}`);
      let post = document.getElementById('postSubmit');
      post.innerHTML='Our apology, we are unable to send your feedback at the moment.';
      post.style.color = 'red';
    }
    this.textarea = '';

  }
  clearP(){
    document.getElementById('postSubmit').innerHTML=''
  }
}
