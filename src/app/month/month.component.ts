import { Component, OnInit, Input, OnChanges } from '@angular/core';
import moment from 'moment';
import { TaskDataService } from '../services/task-data/task-data.service';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css'],
  providers: [TaskDataService]

})
export class MonthComponent implements OnInit, OnChanges {
  date = 0 ;
  weeks = [1, 2, 3, 4, 5, 6];
  daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
  days = [];
  totalCount = 0;
  @Input() currentMonth: string;
  @Input() currentYear : string;
  @Input() daysOfMonth: number;

  constructor(private taskService: TaskDataService) {
  }
  ngOnInit() {
    // this.daysOfMonth = moment(this.currentMonth, "MMMM").daysInMonth()
    this.loadDays(this.daysOfMonth);
    this.date = 0;

  }
  loadDays(daysOfMonth) {
    this.days = [];
    for (let i = 0 ; i < daysOfMonth; i++) {
      const date = this.currentMonth + '-' + (i + 1) + '-'+this.currentYear;
      const toDay = moment(date, 'MMMM-DD-YYYY').format('d');
      this.days.push(toDay);
    }
  }

  ngOnChanges() {
    this.loadDays(this.daysOfMonth);
  }

}
