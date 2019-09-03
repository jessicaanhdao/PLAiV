import { Component, OnInit , Input, OnChanges} from '@angular/core';
import { TaskDataService } from '../services/task-data/task-data.service';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.css']
})
export class WeekComponent implements OnInit, OnChanges {
  @Input() days: string[];
  tasks: [][];
  monTasks: number[];
  tueTasks: number[];
  wedTasks: number[];
  thuTasks: number[];
  friTasks: number[];
  weekendTasks: number[];
  constructor(private taskDataService: TaskDataService) { }



  ngOnInit() {
    this.fecthTask();
  }
  ngOnChanges() {
    this.fecthTask();

  }
  async fecthTask() {
    let date = this.days[1];
    this.monTasks = await this.taskDataService.fetchTaskListByDate(date);
    date = this.days[2];
    this.tueTasks = await this.taskDataService.fetchTaskListByDate(date);
    date = this.days[3];
    this.wedTasks = await this.taskDataService.fetchTaskListByDate(date);
    date = this.days[4];
    this.thuTasks = await this.taskDataService.fetchTaskListByDate(date);
    date = this.days[5];
    this.friTasks = await this.taskDataService.fetchTaskListByDate(date);
    date = this.days[0];
    this.weekendTasks = await this.taskDataService.fetchTaskListByDate(date);
    date = this.days[6];
    if (this.weekendTasks !== undefined) {
      this.weekendTasks.concat(await this.taskDataService.fetchTaskListByDate(date));
    } else {
      this.weekendTasks = (await this.taskDataService.fetchTaskListByDate(date));
    }

  }

}
