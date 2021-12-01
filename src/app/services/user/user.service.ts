import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SendLogin } from 'src/app/models/send-login';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }

  logIn(data: SendLogin): Observable<any>{
    //console.log(data, "login service");
    return this.http.post<any>(this.apiUrl+"/Auth/logIn", data)
  }

  signUp(data: User):Observable<any>{
    return this.http.post<any>(this.apiUrl+"/user/createe", data)
  }
}
