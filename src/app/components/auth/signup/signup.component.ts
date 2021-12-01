import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  formSignup!: FormGroup;
  constructor(
    private router: Router,
    private userService: UserService,
    private cookie: CookieService,
    private messageS: MessageService
  ) { }

  ngOnInit(): void {
    this.formSignup = new FormGroup({
      email: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }
  registrarme(): void {
    // console.log(this.formSignup.value);
    if (this.formSignup.invalid) {
      this.messageS.add({id: "toast" ,severity: 'info', summary: "Campos vacíos", detail: "Por favor llena los campos"})
      return
    }
    let data = {
      username: this.formSignup.get('username')?.value,
      email: this.formSignup.get('email')?.value,
      password: this.formSignup.get('password')?.value,
    }
    this.userService.signUp(data).subscribe(
      (value: any) => {
        console.log(value, 'value');
        let user;
        let error;
        try {
          user = value.user;
        } catch (error) {
          console.log(error);
        }
        try {
          error = value[0].field;
        } catch (error) {
          console.log(error);
        }
        if (user) {
          let data = {
            email: this.formSignup.get('email')?.value,
            password: this.formSignup.get('password')?.value,
          }
          this.ingresar(data);
        }
        else if (error) {
          let summary, detail;
          if (error == "email") {
            summary = "Ups, tu correo";
            detail = "Revisa que tu correo electrónico sea válido y único";
          }
          else if (error == "username") {
            summary = "Ups, tu nombre de usuario";
            detail = "Revisa que tu nombre de usuario sea válido y único";
          }
          else if (error == "password") {
            summary = "Ups, tu contraseña";
            detail = "Revisa que tu contraseña sea mayor a 8 caracteres";
          }
          this.messageS.add({id: "toast" ,severity: 'error', summary: summary, detail: detail})
        }
        else {
          console.log('mmh', value);
          this.messageS.add({id: "toast" ,severity: 'error', summary: "Algo está mal", detail: "Revisa tus datos o intenta más tarde"})
        }
      },
      error => {
        console.log("mmh",error);
        this.messageS.add({id: "toast" ,severity: 'error', summary: "Algo está mal", detail: "Revisa tus datos o intenta más tarde"})
      }
    )
  }
  login(): void {
    this.router.navigate(['login']);
  }

  ingresar(data: any): void{
    this.userService.logIn(data).subscribe(
      (value: any) => {
        console.log(value, 'value');
        let token;
        try {
          token = value.token.token;
        } catch (error) {
          console.log(error);
        }
        if (token) {
          this.cookie.set('token', token);
          this.cookie.set('username', value.username);
          this.router.navigate(['home']);
          console.log(this.cookie.get('token'), 'cookie');
          console.log(this.cookie.get('username'), 'cookie');
        }
        else {
          console.log('mmh', value);
          this.messageS.add({id: "toast" ,severity: 'error', summary: "Algo está mal", detail: "Revisa tus datos o intenta más tarde"})
        }
      },
      error => {
        console.log("mmh",error);
        this.messageS.add({id: "toast" ,severity: 'error', summary: "Algo está mal", detail: "Revisa tus datos o intenta más tarde"})
      }
    )
  }

}
