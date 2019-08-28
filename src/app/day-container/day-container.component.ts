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
        // console.log("time..."+this.currentTime)
        var localMoment = moment()
        this.currentTime = localMoment.format('LTS');
      // this.currentTime = this.currentMoment.format('LTS')
      }
    }, 1000)  
  }
  readURL() {
    console.log("param map "+this.activatedRoute.paramMap)
    console.log("snapshot "+this.activatedRoute.snapshot.params)
    
    this.activatedRoute.paramMap.subscribe(params => {
      let month = params.get('month');
      let date = params.get('date');
      this.paramsDate = "2019/"+month+"/"+date
      console.log(`${month},${date}`);
      if (moment(this.today).isSame(this.paramsDate)) {
        console.log("today")
        this.isToday = true;
      }
    });
  }
  ngOnInit() {
    this.taskDataService.fetchTaskListUnDone(this.radiksDate)
    .then(tasks => this.undone = tasks.length);
    this.readURL()
  }
  prevDay() {
    this.currentMoment.subtract(1,"days")
    this.viewDate = this.currentMoment.format('dddd, MMMM DD, YYYY')
    this.radiksDate = this.currentMoment.format("YYYY/MM/DD")
    this.location.go(this.radiksDate)
    this.readURL()
  }

  nextDay() {
    this.currentMoment.add(1,"days")
    this.viewDate = this.currentMoment.format('dddd, MMMM DD, YYYY')
    this.radiksDate = this.currentMoment.format("YYYY/MM/DD")
    this.location.go(this.radiksDate)
    this.readURL()
  }
}
