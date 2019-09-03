/**file is not being used bc it broke my app */
import { Injectable } from '@angular/core';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class MomentService {
  currentMoment = moment(); // Moment object
  // used for header...
  currentDate = this.currentMoment.format('dddd, MMMM DD, YYYY');
  currentTime = this.currentMoment.format('LTS');
  isToday = false;


  //month component
  cloneMoment = this.currentMoment.clone()
  thisMonth = this.cloneMoment.format('MMMM'); // string object - for view
  thisYear = this.cloneMoment.format('YYYY')
  daysOfMonth = this.cloneMoment.daysInMonth();

  //week component  
  weekStart = this.cloneMoment.startOf('week');
  weekEnd = this.cloneMoment.endOf('week');
  viewWeekStart = this.weekEnd.format('MM/DD');
  viewWeekEnd = this.weekStart.format('MM/DD');


  //day component
  viewDate = this.currentMoment.format('dddd, MMMM DD, YYYY');
  taskUndone = 0;
  totalTasks = 0;
  // get current moment object
  radiksDate = this.currentMoment.format('YYYY/MM/DD');
  

  constructor() {
    setInterval(() => {
      if (this.isToday === true) {
        const localMoment = moment();
        this.currentTime = localMoment.format('LTS');
      }
    }, 1000);
    console.log("hiii")
   }
  getMomentClone() {
    //reset
    console.log("reset")
    this.cloneMoment = this.currentMoment.clone();
    this.viewDate = this.cloneMoment.format('dddd, MMMM DD, YYYY');
    this.radiksDate = this.cloneMoment.format('YYYY/MM/DD');

    console.log("current clone "+this.cloneMoment.format("DD-MMMM"))
    console.log("current moment "+this.currentMoment.format("DD-MMMM"))
  }
  getNextMonth() {
    this.cloneMoment.add(1, 'months');
    this.thisMonth = this.cloneMoment.format('MMMM');
    this.daysOfMonth = this.cloneMoment.daysInMonth();
    this.thisYear = this.cloneMoment.format('YYYY')
  }
  getPrevMonth() {
    this.cloneMoment.subtract(1, 'months');
    this.thisMonth = this.cloneMoment.format('MMMM');
    this.daysOfMonth = this.cloneMoment.daysInMonth();
    this.thisYear = this.cloneMoment.format('YYYY')
  }

  getPrevWeek() {
    this.cloneMoment.subtract(1, 'weeks');
    this.weekStart = this.cloneMoment.startOf('week');
    this.weekEnd = this.cloneMoment.endOf('week');
    this.viewWeekStart = this.weekStart.format('MM/DD');
    this.viewWeekEnd = this.weekEnd.format('MM/DD');
    this.thisMonth = this.cloneMoment.format('MMMM');
    this.thisYear = this.cloneMoment.format('YYYY')

  }
  getNextWeek() {
    this.cloneMoment.add(1, 'weeks');
    this.weekStart = this.cloneMoment.startOf('week');
    this.weekEnd = this.cloneMoment.endOf('week');
    this.viewWeekStart = this.weekStart.format('MM/DD');
    this.viewWeekEnd = this.weekEnd.format('MM/DD');
    this.thisMonth = this.cloneMoment.format('MMMM');
    this.thisYear = this.cloneMoment.format('YYYY')
  }

  getPrevDay() {
    let clony = this.currentMoment.clone()

    clony.subtract(1, 'days');
    this.radiksDate = clony.format('YYYY/MM/DD');
    // this.viewDate = this.cloneMoment.format('dddd, MMMM DD, YYYY');
  }

  getNextDay() {
    let clony = this.currentMoment.clone()

    clony.add(1, 'days');
    this.radiksDate = clony.format('YYYY/MM/DD');
    // this.viewDate = this.cloneMoment.format('dddd, MMMM DD, YYYY');
  }
}
