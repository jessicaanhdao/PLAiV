import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-month-container',
  templateUrl: './month-container.component.html',
  styleUrls: ['./month-container.component.css']
})
export class MonthContainerComponent implements OnInit {
  month = moment() //Moment object
  thisMonth = this.month.format('MMMM') //string object - for view
  daysOfMonth = this.month.daysInMonth()

  constructor() { }

  ngOnInit() {
  }
  nextMonth() {
    this.month.add(1,'months')
    this.thisMonth = this.month.format('MMMM')
    this.daysOfMonth = this.month.daysInMonth()
  }
  prevMonth() {
    this.month.subtract(1,'months')
    this.thisMonth = this.month.format('MMMM')
    this.daysOfMonth = this.month.daysInMonth()

  }
}
