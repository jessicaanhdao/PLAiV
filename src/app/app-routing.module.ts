import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DayComponent } from './day/day.component';
import { MonthContainerComponent } from './month-container/month-container.component';
// import { YearComponent } from './year/year.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { NotfoundComponent } from './notfound/notfound.component';
import { DayContainerComponent } from './day-container/day-container.component';
import { WeekContainerComponent } from './week-container/week-container.component';

const routes: Routes = [
  { path : '', component: DayContainerComponent,  canActivate : [AuthGuard]},
  { path : 'login', component: LoginComponent},
  { path : ':year/:month/:date', component: DayContainerComponent, canActivate : [AuthGuard]},
  { path : 'week', component: WeekContainerComponent, canActivate : [AuthGuard]},
  { path : 'month', component: MonthContainerComponent, canActivate : [AuthGuard]},
  {path: '404', component: NotfoundComponent},
  {path: '**', redirectTo: '/404'}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers : [AuthGuard]
})
export class AppRoutingModule { }
