import { Component, OnInit } from '@angular/core';
import { TaskService} from "../task.service";
import { Router } from "@angular/router"

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  constructor(private _taskService: TaskService,
              private _router: Router) { }
  task = {
    title: '',
    description: '',
    date: new Date(),
    userId: sessionStorage.getItem('id'),
    state: 'new'
  };
  isValidTask = true;
  states = ['new', 'completed', 'deleted'];
  currentState = this.states[0];
  ngOnInit() {
    this.task.state = this.currentState;
  }

  addTask() {
    if (this.task.title !== '') {
      this.isValidTask = true;
      this.task.state = this.currentState;
      let userId = sessionStorage.getItem('id');
      if (userId) {
        this._taskService.addTask(userId, this.task).subscribe(
          res => {
            console.log(res);
            this._router.navigate(['/tasks']);
          },
          err => console.log(err)
        );
      } else {
        console.log('session ended');
        this._router.navigate(['/login']);
      }
    } else {
      this.isValidTask = false;
    }
  }

  cancel(){
    this._router.navigate(['./tasks']);
  }
}
