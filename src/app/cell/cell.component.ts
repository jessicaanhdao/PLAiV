import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { TaskDataService } from '../shared/task-data/task-data.service';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {
  @Input() currentMonth : string
  @Input() day : Number
 
  constructor(private taskService : TaskDataService) { }
  num = ""
  ngOnInit() {
  }
  ngOnChanges(){
    this.getTask();
    this.num = ""
  }
  async getTask() {
    var month = moment(this.currentMonth,"MMMM").format("MM")
    var dateString = "2019/"+month+"/"+this.day;
    var taskCount = 0
    try {
      taskCount= await this.taskService.fetchTaskListByDate(dateString).then((tasks) => {return tasks.length })
    } catch(e) {
      console.error(e.message)
    }
    taskCount > 0 ? (taskCount > 1 ? this.num = taskCount + " tasks":this.num = taskCount + " task"  ) : ""
    return this.num;

  }

}
