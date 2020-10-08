import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TaskService} from "../task.service";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  constructor(private _activatedRoute: ActivatedRoute,
              private _taskService: TaskService,
              private _router: Router) { }
  task = {};
  id;
  states = ['new', 'completed', 'deleted'];
  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      this.id = params.id;
      this._taskService.getTaskById(this.id).subscribe(res => this.task = res );
    });
  }

  editTask() {
    this._taskService.editTask(this.id, this.task).subscribe(res => this.task = res);
    this._router.navigate(['./tasks']);
  }

  deleteTask() {
    this._taskService.deleteTaskById(this.id).subscribe( res => console.log(`deleted ${res.deletedCount} task`));
    this._router.navigate(['/tasks']);
  }

  cancel(){
    this._router.navigate(['/tasks']);
  }
}
