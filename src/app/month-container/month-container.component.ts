import { Component, OnInit } from '@angular/core';
import { MomentService } from '../services/moment/moment.service';
import moment from 'moment';

@Component({
  selector: 'app-month-container',
  templateUrl: './month-container.component.html',
  styleUrls: ['./month-container.component.css']
})
export class MonthContainerComponent implements OnInit {
  month = moment(); // Moment object
  thisMonth = this.month.format('MMMM'); // string object - for view
  thisYear = this.month.format('YYYY')
  daysOfMonth = this.month.daysInMonth();

  constructor() { }

  ngOnInit() {
  }

  getMonthInfo() {
    this.thisMonth = this.month.format('MMMM'); // string object - for view
    this.thisYear = this.month.format('YYYY')
    this.daysOfMonth = this.month.daysInMonth();
  }
  
  nextMonth() {
    this.month.add(1, 'months');
    this.getMonthInfo();
  }
  prevMonth() {
    this.month.subtract(1, 'months');
    this.getMonthInfo();

  }
}
