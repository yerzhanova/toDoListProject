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
  user = {
  };
  states = [
    'all',
    'completed',
    'new',
    'deleted'
  ];
  filteredTasks = [];
  filterState = this.states[0];
  ngOnInit() {
    const userId = sessionStorage.getItem('id');
    this._taskService.getTasksByUserId(userId).subscribe(
      res => {
         console.log(res);
         this.tasks = res;
         this.filteredTasks = res;
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this._router.navigate(['/login']);
          }
        }
      }
    );
  }

  editTask(task) {
    this._router.navigate(['editTask', task._id]);
  }

  addTask() {
    this._router.navigate(['addTask']);
  }

  filterByState() {
    if (this.filterState === 'all') {
      this.filteredTasks = this.tasks;
    } else {
      console.log(this.filterState);
      this.filteredTasks = this.tasks.filter(task => task.state === this.filterState);
    }
  }
}
