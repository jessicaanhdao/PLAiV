import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskDataService } from '../shared/task-data/task-data.service';

@Component({
  selector: 'app-day-container',
  templateUrl: './day-container.component.html',
  styleUrls: ['./day-container.component.css']
})
export class DayContainerComponent implements OnInit {
  today = moment();
  undone = 0;
  //get current moment object
  currentMoment = moment();
  
  //used to fetch tasks under this format "YYYY/MM/DD"
  radiksDate = this.currentMoment.format("YYYY/MM/DD")

  //used for header...
  viewDate = this.currentMoment.format('dddd, MMMM DD, YYYY')
  currentTime = this.currentMoment.format('LTS')
  isToday = true;

  constructor(private activatedRoute: ActivatedRoute, private router : Router, private taskDataService : TaskDataService) {
    console.log("param map "+this.activatedRoute.paramMap)
    console.log("snapshot "+this.activatedRoute.snapshot)
    
    this.activatedRoute.paramMap.subscribe(params => {
      let month = params['month'];
      let date = params['date'];
      console.log("params "+params.getAll("month"))

      // console.log(`${month},${date}`);
      // this.currentDate = moment(`2019/${month}/${date}`).format("YYYY/MM/DD")
      // console.log("current moment "+this.currentDate)
      // this.fetchTasks()
    });

    // setInterval(() => {
    //   if (this.isToday == true) {
    //   this.currentMoment = moment();
    //   this.currentTime = this.currentMoment.format('LTS')
    //   }
    // }, 1000)  
  }

  ngOnInit() {
    this.taskDataService.fetchTaskListUnDone(this.radiksDate)
    .then(tasks => this.undone = tasks.length);
  }
  prevDay() {
    this.currentMoment.subtract(1,"days")
    this.viewDate = this.currentMoment.format('dddd, MMMM DD, YYYY')
    this.radiksDate = this.currentMoment.format("YYYY/MM/DD")

    this.isToday = false;
    // this.router.navigate([], {
    //   relativeTo: this.activatedRoute,
    //   queryParams: {
    //     month: 'August'
    //   },
    //   queryParamsHandling: 'merge',
    // });
    // this.router.navigate(['./', { month:'September' , date: '03' }]);
  }

  nextDay() {
    this.currentMoment.add(1,"days")
    this.viewDate = this.currentMoment.format('dddd, MMMM DD, YYYY')
    this.radiksDate = this.currentMoment.format("YYYY/MM/DD")

    this.isToday = false;
  }
}
