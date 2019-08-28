import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { DayComponent } from './day/day.component';
import { MonthComponent } from './month/month.component';
import { AppBootstrapModule } from './app-bootstrap.module';
import { MonthContainerComponent } from './month-container/month-container.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CellComponent } from './cell/cell.component';
import { WeekComponent } from './week/week.component';
import { DayContainerComponent } from './day-container/day-container.component';
import { WeekContainerComponent } from './week-container/week-container.component';
import { WeekCellComponent } from './week-cell/week-cell.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatTooltipModule } from '@angular/material/tooltip';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DayComponent,
    WeekComponent,
    MonthComponent,
    MonthContainerComponent,
    LoginComponent,
    NotfoundComponent,
    CellComponent,
    DayContainerComponent,
    WeekContainerComponent,
    WeekCellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppBootstrapModule,
    FormsModule,
    HttpClientModule,
    // BrowserAnimationsModule,
    // MatTooltipModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
