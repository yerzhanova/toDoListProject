import { Component, OnInit } from '@angular/core';
import { TaskService } from "../task.service";
import { Router } from "@angular/router"
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor(private _taskService: TaskService,
              private _router: Router) { }
  tasks = [];
  user = {};
  ngOnInit() {
    console.log(localStorage.getItem('subject'),"ggg", localStorage);
    this._taskService.getTasks().subscribe(
      res => {
        res.forEach(task => {
          if (task.title) {
            this.tasks.push(task);
          }
        });
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this._router.navigate(['/login']);
          }
        }
      }
    )
  }
  editTask(task) {
    this._router.navigate(['editTask', task._id])
  }
}
