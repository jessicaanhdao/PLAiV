import { Component, OnInit, Input, OnChanges } from '@angular/core';
import * as moment from 'moment';
import { ActivatedRoute } from "@angular/router";
import { TaskDataService } from '../shared/task-data/task-data.service';
import {Task} from '../task'
declare var $: any;

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css'],
  providers: [TaskDataService]
})
export class DayComponent implements OnInit, OnChanges {
  currentMoment = moment();
  currentDate = this.currentMoment.format("YYYY/MM/DD")
  todayDate = this.currentMoment.format('dddd, MMMM DD, YYYY')
  currentTime = this.currentMoment.format('LTS')
  taskList : Task[];
  newTask : Task ;
  isToday = true;
  
  constructor(private activatedRoute: ActivatedRoute, private taskService : TaskDataService  ) { 
   
    this.activatedRoute.params.subscribe(params => {
      let month = params['month'];
      let date = params['date'];
      
      console.log(`${month},${date}`);
      });
 
      setInterval(() => {
        if (this.isToday == true) {

        console.log("is today? "+this.isToday)

        this.currentMoment = moment();
        this.currentTime = this.currentMoment.format('LTS')
        }
      }, 1000)

    
  }
  addNewTask() {
    if (this.newTask.TaskName.trim() !== ""){
      this.newTask.TaskID = this.taskList.length
      this.newTask.IsDone = false

      this.taskService.postNewTask(this.newTask)
        .subscribe((res : Task) => {
          console.log(res);
          this.taskList.push(res)
        })
    }
    this.newTask.TaskName = ""

  }
  checkTaskDone(id ,i) {
    console.log("current id" +id)
    var task = this.taskList[id]
    task.IsDone = !task.IsDone
    this.taskService.checkTaskDone(id, this.currentDate, task)
    .subscribe(
      (res : Task) => {
        this.taskList[res.TaskID].IsDone = !this.taskList[res.TaskID].IsDone
        console.log("after update "+res.TaskID)
      }
    )
  }
  deleteTask(id, i) {
    this.taskService.deleteTask(id, this.currentDate).subscribe(
      (res : Task) => {
        this.taskList.splice(i,1)
        console.log("after delete "+res.TaskName+" with ID "+res.TaskID)
      }
    )
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
    console.log("helloo")
  }
  ngOnInit() {
    this.fetchTasks()
  }

  prevDay() {
    this.currentMoment.subtract(1,"days")
    this.isToday = false;
    this.fetchTime()
    this.fetchTasks()
  }

  nextDay() {
    this.currentMoment.add(1,"days")
    this.isToday = false;
    this.fetchTime()
    this.fetchTasks()
  }
  fetchTime() {
    this.currentDate = this.currentMoment.format("YYYY/MM/DD")
    console.log("current date" + this.currentDate)

    this.todayDate = this.currentMoment.format('dddd, MMMM DD, YYYY')
  }
  fetchTasks(){
    this.newTask = { TaskID : 0, TaskName : "", DoneBy : "", IsDone : false, PostedDate : this.currentDate}
    this.taskService.getTaskListByDate(this.currentDate).subscribe(res => {
      this.taskList = res as Task[]});
  }
}
