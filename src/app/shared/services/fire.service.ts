import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { Observable } from 'rxjs';

import { TaskID } from '../interfaces/task-id';
import { Task } from '../interfaces/task';


@Injectable({
  providedIn: 'root'
})
export class FireService {
  public static baseUrl = `https://angular-organizer-13f99.firebaseio.com/tasks`;

  constructor(private http: HttpClient) { }

  loadTasks(date: moment.Moment): Observable<Task[]> {
    return this.http.get<Task[]>(`${FireService.baseUrl}/${date.format('D-MM-YYYY')}.json`)
      .pipe(
        map((tasks) => {
          if (!tasks) {
            return [];
          }
          console.log(`это из сервиса: ${Object.keys(tasks)}`);
          return Object.keys(tasks).map((key) => {
            return {
              ...tasks[key], id: key
            }
          })
        })
      )
  }
  createTask(task: Task): Observable<Task> {
    return this.http.post<TaskID>(`${FireService.baseUrl}/${task.date}.json`, task)
      .pipe(map((res) => {
        // console.log({...task, id: res.name});
        return {
          ...task, id: res.name
        }
      }));
  }
  removeTask(task: Task): Observable<void> {
    return this.http.delete<void>(`${FireService.baseUrl}/${task.date}/${task.id}.json`);
  }
}
