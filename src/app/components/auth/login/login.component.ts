import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      user: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });


  }

  ingresar(){
    console.log(this.formLogin.value);
    if (this.formLogin.invalid) return;
    this.router.navigate(['home']);
  }


}
