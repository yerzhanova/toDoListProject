import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from "@angular/common/http";
import { RegisterComponent } from './register/register.component';
import { AuthService } from "./auth.service";
import { TaskService} from "./task.service";
import { TaskComponent } from './task/task.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService, TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
