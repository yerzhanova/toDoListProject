import { Component, OnInit } from '@angular/core';
import { TaskService } from "../task.service";
import { Router } from "@angular/router"

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor(private _taskService: TaskService,
              private _router: Router) { }
  tasks = [];
  ngOnInit() {
    this._taskService.getTasks().subscribe(
      res => {
        res.forEach(task => {
          if (task.title) {
            this.tasks.push(task);
          }
        });
      },
      err => console.log(err)
    )
  }
  editTask(task) {
    this._router.navigate(['editTask', task._id])
  }
}
