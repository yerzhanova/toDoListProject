import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private _taskServiceUrl = "http://localhost:3000/api/tasks";
  private _addTaskServiceUrl = "http://localhost:3000/api/addTask";
  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get<any>(this._taskServiceUrl);
  }

  addTask(task) {
    return this.http.post<any>(this._addTaskServiceUrl, task);
  }
}
