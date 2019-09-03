import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { MomentService } from '../services/moment/moment.service';

@Component({
  selector: 'app-week-container',
  templateUrl: './week-container.component.html',
  styleUrls: ['./week-container.component.css']
})
export class WeekContainerComponent implements OnInit {

  constructor() { }

  week = moment();

  weekStart = this.week.clone().startOf('week');
  weekEnd = this.week.clone().endOf('week');
  viewWeekStart = this.week.clone().startOf('week').format('MM/DD');
  viewWeekEnd = this.week.clone().endOf('week').format('MM/DD');
  days = [];
  daysFormat = [];
  thisMonth = this.week.format('MMMM')
  thisYear = this.week.format('YYYY')

 

  ngOnInit() {
    // console.log('start end ' + this.weekStart + ' ' + this.weekEnd);
    this.generateDays();
  }
  prevWeek() {
    this.week.subtract(1, 'weeks');
    this.days = [];
    this.updateWeekInfo();
    this.generateDays();
  }
  nextWeek() {
    this.week.add(1, 'weeks');
    this.days = [];
    this.updateWeekInfo();
    this.generateDays();
  }
  updateWeekInfo() {
    this.weekStart = this.week.clone().startOf('week');
    this.weekEnd = this.week.clone().endOf('week');
    this.viewWeekStart = this.week.clone().startOf('week').format('MM/DD');
    this.viewWeekEnd = this.week.clone().endOf('week').format('MM/DD');
    this.thisMonth = this.week.format('MMMM');
    this.thisYear = this.week.format('YYYY');

  }
  generateDays() {
    for (let i = 0; i <= 6; i++) {
      this.days.push(moment(this.weekStart).add(i, 'days').format('YYYY/MM/DD'));

    }
    // console.log("monday tuesday"+this.days[1]+" "+this.days[2])
  }

}
