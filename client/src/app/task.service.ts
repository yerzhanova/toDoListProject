import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private _taskServiceUrl = "http://localhost:3000/api/tasks";
  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get<any>(this._taskServiceUrl);
  }
}
