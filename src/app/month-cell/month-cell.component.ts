import { Component, OnInit, Input, OnChanges } from '@angular/core';
import moment from 'moment';
import { TaskDataService } from '../services/task-data/task-data.service';

@Component({
  selector: 'app-cell',
  templateUrl: './month-cell.component.html',
  styleUrls: ['./month-cell.component.css']
})
export class CellComponent implements OnInit, OnChanges {
  @Input() currentMonth: string;
  @Input() currentYear : string;
  @Input() day: number;

  constructor(private taskService: TaskDataService) { }
  num = '';
  dateString = '';
  month =  '';
  ngOnInit() {
  }
  ngOnChanges() {
    this.getTask();
    this.num = '';
  }
  taskCount = 0
  async getTask() {
    this.month = moment(this.currentMonth, 'MMMM').format('MM');
    if (this.day < 10) {
      this.dateString = this.currentYear+ '/' + this.month + '/0' + this.day;
    } else {
      this.dateString = this.currentYear+ '/' + this.month + '/' + this.day;
    }
    this.taskCount = 0;
    try {
      this.taskCount = await this.taskService.fetchTaskListUnDone(this.dateString);
    } catch (e) {
      console.error(e.message);
    }
    this.taskCount > 0 ?  this.num = this.taskCount + ' incomplete' : '';
    return this.num;

  }

}
