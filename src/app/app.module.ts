import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DateSelectorComponent } from './components/date-selector/date-selector.component';
import { OrganizerComponent } from './components/organizer/organizer.component';
import { MomentPipe } from './shared/pipes/moment.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    DateSelectorComponent,
    OrganizerComponent,
    MomentPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
