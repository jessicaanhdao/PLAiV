import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
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
import { CellComponent } from './month-cell/month-cell.component';
import { WeekComponent } from './week/week.component';
import { DayContainerComponent } from './day-container/day-container.component';
import { WeekContainerComponent } from './week-container/week-container.component';
import { WeekCellComponent } from './week-cell/week-cell.component';
import { ErrorModalComponent } from './error-modal/error-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AllTasksComponent } from './all-tasks/all-tasks.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { FooterComponent } from './footer/footer.component';
import { SupportUsComponent } from './support-us/support-us.component';
import { InfoComponent } from './info/info.component';
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
    WeekCellComponent,
    ErrorModalComponent,
    AllTasksComponent,
    FeedbackComponent,
    FooterComponent,
    SupportUsComponent,
    InfoComponent,
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    AppBootstrapModule,
    FormsModule,
    HttpClientModule,
    // BrowserAnimationsModule,
    // MatTooltipModule,
  ],
  entryComponents: [ErrorModalComponent],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
