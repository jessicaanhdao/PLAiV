import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DayComponent } from './day/day.component';
import { MonthContainerComponent } from './month-container/month-container.component';
import { YearComponent } from './year/year.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path : '', component: DayComponent},
  { path : 'login', component: LoginComponent},
  { path : ':month/:date', component: DayComponent},
  { path : 'month', component: MonthContainerComponent},
  { path : 'year', component: YearComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
