import { Component, OnInit, Input, OnChanges } from '@angular/core';
import moment from 'moment';
import { TaskDataService } from '../shared/task-data/task-data.service';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit, OnChanges {
  @Input() currentMonth: string;
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
  async getTask() {
    this.month = moment(this.currentMonth, 'MMMM').format('MM');
    if (this.day < 10) {
      this.dateString = '2019/' + this.month + '/0' + this.day;
    } else {
      this.dateString = '2019/' + this.month + '/' + this.day;
    }
    let taskCount = 0;
    try {
      taskCount = await this.taskService.fetchTaskListUnDone(this.dateString);
    } catch (e) {
      console.error(e.message);
    }
    taskCount > 0 ?  this.num = taskCount + ' incomplete' : '';
    return this.num;

  }

}
