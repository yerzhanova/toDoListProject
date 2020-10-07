import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { TaskComponent } from "./task/task.component";
import { AddTaskComponent } from "./add-task/add-task.component";
import { EditTaskComponent } from "./edit-task/edit-task.component";
import {AuthGuard} from "./auth.guard";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'tasks',
    component: TaskComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'addTask',
    component: AddTaskComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editTask/:id',
    component: EditTaskComponent,
    canActivate: [AuthGuard]
  },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
