import { Component } from '@angular/core';
import { DateService } from 'src/app/shared/services/date.service';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.scss']
})
export class DateSelectorComponent {

  constructor(private dateService: DateService) {}

  changeMonth(direction: number) {
    this.dateService.changeMonth(direction);
  }

}
