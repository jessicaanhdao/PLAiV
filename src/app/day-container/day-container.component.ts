import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskDataService } from '../shared/task-data/task-data.service';
import { Location } from '@angular/common';
import { DayComponent } from '../day/day.component';

@Component({
  selector: 'app-day-container',
  templateUrl: './day-container.component.html',
  styleUrls: ['./day-container.component.css']
})
export class DayContainerComponent implements OnInit, AfterViewInit {
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private taskDataService: TaskDataService,
              private location: Location) {


    setInterval(() => {
      if (this.isToday == true) {
        const localMoment = moment();
        this.currentTime = localMoment.format('LTS');
      }
    }, 1000);
  }
  today = moment().format('YYYY/MM/DD');
  taskUndone = 0;
  totalTasks = 0;
  // get current moment object
  currentMoment = moment();

  // used to fetch tasks under this format "YYYY/MM/DD"
  radiksDate = this.currentMoment.format('YYYY/MM/DD');
  paramsDate = '';
  // used for header...
  viewDate = this.currentMoment.format('dddd, MMMM DD, YYYY');
  currentTime = this.currentMoment.format('LTS');
  isToday = false;

  @ViewChild(DayComponent, {static: false}) dayComponent: DayComponent;
  readURL() {
    // console.log("param map "+this.activatedRoute.paramMap)
    // console.log("snapshot "+this.activatedRoute.snapshot.params)
    this.activatedRoute.params.subscribe(params => {
      const month = params.month;
      const date = params.date;
      this.radiksDate = '2019/' + month + '/' + date;
      if (month !== undefined && date !== undefined) {
        this.currentMoment = moment(this.radiksDate, 'YYYY/MM/DD');
        this.viewDate = this.currentMoment.format('dddd, MMMM DD, YYYY');
        console.log(`${month},${date}`);
        if (moment(this.today).isSame(this.paramsDate)) {
          console.log('today');
          this.isToday = true;
        }
      }
    });
  }
  ngOnInit() {
    this.readURL();
    this.viewDate = this.currentMoment.format('dddd, MMMM DD, YYYY');
    this.currentTime = this.currentMoment.format('LTS');
    this.radiksDate = this.currentMoment.format('YYYY/MM/DD');
  }
  prevDay() {
    this.currentMoment.subtract(1, 'days');
    this.radiksDate = this.currentMoment.format('YYYY/MM/DD');
    this.router.navigate(['/' + this.radiksDate ]);
  }

  nextDay() {
    this.currentMoment.add(1, 'days');
    this.radiksDate = this.currentMoment.format('YYYY/MM/DD');
    this.router.navigate(['/' + this.radiksDate ]);
  }
  async ngAfterViewInit() {
    // console.log("Task in parent "+this.dayComponent.taskUndone);
    // this.taskUndone = await this.dayComponent.ngOnChanges();
  }
}

