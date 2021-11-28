import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }

  logIn(data: any) {
    return this.http.post(this.apiUrl+"login", data);
  }
}
