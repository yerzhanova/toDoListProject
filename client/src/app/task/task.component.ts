import { Component, OnInit } from '@angular/core';
import { TaskService} from "../task.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor(private _taskService: TaskService) { }
  tasks = [];
  ngOnInit() {
    this._taskService.getTasks().subscribe(
      res => {
        this.tasks = res;
      },
      err => console.log(err)
    )
  }

}
