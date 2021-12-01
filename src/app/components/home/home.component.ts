import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username!: string;
  fotos = ['1','2','3','4','5','6','7','8'];
  constructor(
    private router: Router,
    private cookie: CookieService
  ) { }

  ngOnInit(): void {
    this.username = this.cookie.get('username');
  }

  logOut(){
    this.cookie.deleteAll();
    this.router.navigate(['logIn']);
  }

}
