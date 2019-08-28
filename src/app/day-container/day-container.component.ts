import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskDataService } from '../shared/task-data/task-data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-day-container',
  templateUrl: './day-container.component.html',
  styleUrls: ['./day-container.component.css']
})
export class DayContainerComponent implements OnInit {
  today = moment().format("YYYY/MM/DD");
  undone = 0;
  //get current moment object
  currentMoment = moment();
  
  //used to fetch tasks under this format "YYYY/MM/DD"
  radiksDate = this.currentMoment.format("YYYY/MM/DD")
  paramsDate = ""
  //used for header...
  viewDate = this.currentMoment.format('dddd, MMMM DD, YYYY')
  currentTime = this.currentMoment.format('LTS')
  isToday = false;

  constructor(private activatedRoute: ActivatedRoute, 
    private router : Router, 
    private taskDataService : TaskDataService,
    private location : Location) {
    

    setInterval(() => {
      if (this.isToday == true) {
        var localMoment = moment()
        this.currentTime = localMoment.format('LTS');
      }
    }, 1000)  
  }
  readURL() {
    // console.log("param map "+this.activatedRoute.paramMap)
    // console.log("snapshot "+this.activatedRoute.snapshot.params)
    this.activatedRoute.params.subscribe(params => {
      let month = params['month'];
      let date = params['date'];
      this.radiksDate = "2019/"+month+"/"+date
      if (month !== null && date !== null) {
        this.currentMoment = moment(this.radiksDate,"YYYY/MM/DD")
        console.log(`${month},${date}`);
        if (moment(this.today).isSame(this.paramsDate)) {
          console.log("today")
          this.isToday = true;
        }
      }
    });
  }
  ngOnInit() {
    this.taskDataService.fetchTaskListUnDone(this.radiksDate)
    .then(tasks => this.undone = tasks.length);
    this.readURL()
    this.viewDate = this.currentMoment.format('dddd, MMMM DD, YYYY')
    this.currentTime = this.currentMoment.format('LTS')
    this.radiksDate = this.currentMoment.format("YYYY/MM/DD")
    console.log("get state "+this.location.path())
  }
  prevDay() {
    this.currentMoment.subtract(1,"days")
    // this.viewDate = this.currentMoment.format('dddd, MMMM DD, YYYY')
    this.radiksDate = this.currentMoment.format("YYYY/MM/DD")
    this.router.navigate(['/'+this.radiksDate ])

    // const url = this
    //     .router
    //     .createUrlTree([this.radiksDate], {})
    //     .toString();
    // this.location.go(url)
    // this.readURL()
    // console.log("get state "+this.location.path())

  }

  nextDay() {
    this.currentMoment.add(1,"days")
    // this.viewDate = this.currentMoment.format('dddd, MMMM DD, YYYY')
    this.radiksDate = this.currentMoment.format("YYYY/MM/DD")
    this.router.navigate(['/'+this.radiksDate ])

    // this.location.go(this.radiksDate)
    // this.readURL()
  }
}
