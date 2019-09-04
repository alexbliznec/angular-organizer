import { Component, OnInit } from '@angular/core';
import { DateService } from 'src/app/shared/services/date.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FireService } from 'src/app/shared/services/fire.service';
import { Task } from 'src/app/shared/interfaces/task';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {
  public tasksForm: FormGroup;
  public tasks: Task[] = [];
  constructor(private dateService: DateService, private fb: FormBuilder, private tasksService: FireService) { }

  ngOnInit() {
    this.dateService.date.pipe(
      switchMap((value) => {
         return this.tasksService.loadTasks(value);
      })
    ).subscribe((tasks) => {
      this.tasks = tasks;
    })
    this.tasksForm = this.fb.group({
      title: this.fb.control('', [Validators.required])
    })

  }
  submit() {
    // console.log(this.tasksForm.value.title);
    const {title} = this.tasksForm.value;
    const task: Task = {
      title,
      date: this.dateService.date.value.format('D-MM-YYYY'),
    }
    this.tasksService.createTask(task).subscribe((task) => {
      this.tasks.push(task);
      // console.log(task);
      this.tasksForm.reset();
    },
    (err) => {
      console.error(err);
    });
  }
  removeTask(task: Task) {
    this.tasksService.removeTask(task).subscribe(() => {
      this.tasks = this.tasks.filter((el) => {
        return el.id !== task.id;
      })
    }, (err) => console.error(err));
  } 

}
