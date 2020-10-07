import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private _taskServiceUrl = "http://localhost:3000/api/tasks";
  private _addTaskServiceUrl = "http://localhost:3000/api/addTask";
  private _editTaskServiceUrl = "http://localhost:3000/api/editTask";
  private _getTasksByUserIdServiceUrl = "http://localhost:3000/api/getTasksByUserId";
  private _getTaskByIdServiceUrl = "http://localhost:3000/api/getTaskById";
  private _deleteTaskByIdServiceUrl = "http://localhost:3000/api/deleteTaskById";
  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get<any[]>(this._taskServiceUrl);
  }

  getTasksByUserId(id) {
    return this.http.get<any>(this._getTasksByUserIdServiceUrl, id);
  }

  getTaskById(id) {
    return this.http.get<any>(`${this._getTaskByIdServiceUrl}/${id}`, id);
  }

  addTask(task) {
    return this.http.post<any>(this._addTaskServiceUrl, task);
  }

  editTask(id, task) {
    return this.http.put<any>(this._editTaskServiceUrl, {id, task});
  }

  deleteTaskById(id) {
    return this.http.post<any>(this._deleteTaskByIdServiceUrl, {id});
  }
}
