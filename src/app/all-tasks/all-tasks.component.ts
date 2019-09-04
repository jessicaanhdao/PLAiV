import { Component, OnInit } from '@angular/core';
import { TaskDataService } from '../services/task-data/task-data.service';
import moment  from 'moment';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css']
})
export class AllTasksComponent implements OnInit {

  constructor(private taskDataService: TaskDataService) { }
  allTasks = []
  allDates = new Map()
  allDatesFormat = new Map()
  async ngOnInit() {
    this.allTasks = await this.taskDataService.fetchAllTasks();
    // console.log("all tasks" +await this.allTasks.length)
    await this.getDates()
  }
  getDates() {
    for (let task of this.allTasks) {
      if (task.attrs.dateCreated !== '') {
        if (!this.allDates.has(task.attrs.dateCreated) ) {
          this.allDates.set(task.attrs.dateCreated,[])
          this.allDatesFormat.set(task.attrs.dateCreated, moment(task.attrs.dateCreated,'YYYY/MM/DD').format('MMMM-DD-YYYY'))
        }
        var tasks = this.allDates.get(task.attrs.dateCreated)
        tasks.push(task.attrs.name)
        this.allDates.set(task.attrs.dateCreated,tasks)
      }
      
    }
  }

}
