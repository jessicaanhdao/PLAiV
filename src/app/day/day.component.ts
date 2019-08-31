import { Component, OnInit, Input, OnChanges, Output, ViewContainerRef } from '@angular/core';
import moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { TaskDataService } from '../shared/task-data/task-data.service';
import { DayContainerComponent } from '../day-container/day-container.component';
import Task from '../models/task';

// import Task from '../models/task'
declare var $: any;

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css'],
  providers: [TaskDataService]
})
export class DayComponent implements OnInit, OnChanges {
  constructor( private taskDataService: TaskDataService,
               private viewContainerRef: ViewContainerRef ) {
  }

  taskList: Task[];
  newTask = {  TaskName : '', DoneBy : '', IsDone : false, PostedDate : ''};
  isToday = true;

  @Input() currentMoment: moment.Moment ;
  @Input() radiksDate: string ;
  totalTasks = 0;
  taskUndone = 0;
  async addNewTask() {
    await this.taskDataService.addNewTask(this.newTask);
    this.newTask.TaskName = '';
    this.newTask.DoneBy = '';
    await this.fetchTasks();
  }
  async checkTaskDone(task , i) {
    this.taskDataService.checkTaskDone(task);
    await this.countUndone();
  }
  async deleteTask(task, i) {
    await this.taskDataService.deleteTask(task);
    await this.fetchTasks();

  }
  async editTask(task) {
    await this.taskDataService.editTask(task);
  }
  filterBy(prop: string) {
    return this.taskList.sort((a, b ) =>  {
    const aTime = moment(a[prop], 'HH:mm');
    const bTime = moment(b[prop], 'HH:mm');
    const diff = aTime.diff(bTime);
    return diff > 0 ? 1 : diff === 0 ? 0 : -1;
  });
  }

  ngOnChanges() {
    this.fetchTasks();
  }
  ngOnInit() {
    this.radiksDate = this.currentMoment.format('YYYY/MM/DD');
  }
  async fetchTasks() {
    this.newTask = {TaskName : '', DoneBy : '', IsDone : false, PostedDate : this.radiksDate};
    this.taskList = await this.taskDataService.fetchTaskListByDate( this.radiksDate);
    this.getParentComponent().totalTasks = await this.taskList.length;
    await this.countUndone();
  }
  countUndone() {
    this.taskUndone = this.taskDataService.countUndone(this.taskList);
    this.getParentComponent().taskUndone = this.taskUndone;
    return this.taskUndone;
  }
  getParentComponent(): DayContainerComponent {
    return this.viewContainerRef['_data'].componentView.component.viewContainerRef['_view']
    .component;
  }

}
