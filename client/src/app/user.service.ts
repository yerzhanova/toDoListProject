import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _userServiceUrl = "http://localhost:3000/api/user";
  constructor(private http: HttpClient) { }

  getCurrentUser(userId) {
    return this.http.get<any>(this._userServiceUrl);
  }
}
