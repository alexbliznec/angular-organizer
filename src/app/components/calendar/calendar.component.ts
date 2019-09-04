import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DateService } from 'src/app/shared/services/date.service';
import { Week } from 'src/app/shared/interfaces/week';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  calendar: Week[];

  constructor(private dateService: DateService) { }

  ngOnInit() {
    this.dateService.date.subscribe((data) => {
      this.showCalendar(data);
    })
  }
  showCalendar(nowDate: moment.Moment) {
    const startDay = nowDate.clone().startOf('month').startOf('week');
    const endDay = nowDate.clone().endOf('month').endOf('week');
    const date = startDay.clone().subtract(1, 'day');
    const calendar = [];
    // console.log(`это дейт ${date}`)
    while (date.isBefore(endDay, 'day')) {
      calendar.push({
        days: Array(7)
          .fill(0)
          .map(() => {
            const value = date.add(1, 'day').clone();
            const active = moment().isSame(value, 'date');
            const disabled = !nowDate.isSame(value, 'month');
            const selected = nowDate.isSame(value, 'date');
            return {
              value, active, disabled, selected
            }
          })
      })
    }
    this.calendar = calendar;
    // console.log(calendar);
  }
  selectDate(day: moment.Moment) {
    this.dateService.changeDate(day);
  }

}
