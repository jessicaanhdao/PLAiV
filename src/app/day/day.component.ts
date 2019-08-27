import { Component, OnInit, Input, OnChanges } from '@angular/core';
import * as moment from 'moment';
import { ActivatedRoute } from "@angular/router";
import { TaskDataService } from '../shared/task-data/task-data.service';
// import Task from '../models/task'
declare var $: any;

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css'],
  providers: [TaskDataService]
})
export class DayComponent implements OnInit, OnChanges {
  
  taskList : [];
  newTask = {  TaskName : "", DoneBy : "", IsDone : false, PostedDate : ""}
  isToday = true;
  // radiksDate : string;

  @Input() currentMoment : moment.Moment ;
  @Input() radiksDate : string ;
  
  constructor( private taskDataService : TaskDataService  ) { 
  }
  async addNewTask() {
    await this.taskDataService.addNewTask(this.newTask);
    this.newTask.TaskName = "" 
    this.newTask.DoneBy = ""
    await this.fetchTasks()
  }
  async checkTaskDone(task ,i) {
    this.taskDataService.checkTaskDone(task)
  }
  async deleteTask(task, i) {
    await this.taskDataService.deleteTask(task)
    await this.fetchTasks()

  }
  filterBy(prop: string) {
    return this.taskList.sort((a, b ) =>  {
    var aTime = moment(a[prop],"HH:mm")
    var bTime = moment(b[prop],"HH:mm")
    var diff = aTime.diff(bTime)
    return diff > 0 ? 1 : diff === 0 ? 0 : -1
  });
  }

  ngOnChanges(){
    this.fetchTasks()
  }
  ngOnInit() {
    // console.log( `moment ${this.currentMoment} vs today ${this.today} `)
    this.radiksDate = this.currentMoment.format("YYYY/MM/DD")

  }

  async fetchTasks(){
    this.newTask = {TaskName : "", DoneBy : "", IsDone : false, PostedDate : this.radiksDate}
    this.taskList = await this.taskDataService.fetchTaskListByDate( this.radiksDate)
    // console.log("Task list "+this.taskList.length)

  }
}
