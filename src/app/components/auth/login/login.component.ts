import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  constructor(
    private router: Router,
    private userService: UserService,
    private cookie: CookieService,
    private messageS: MessageService
  ) { }

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });


  }

  ingresar(): void{
    // console.log(this.formLogin.value);
    if (this.formLogin.invalid) {
      this.messageS.add({id: "toast" ,severity: 'info', summary: "Campos vacíos", detail: "Por favor llena los campos"})
      return
    }
    let data = {
      email: this.formLogin.get('email')?.value,
      password: this.formLogin.get('password')?.value,
    }
    this.userService.logIn(data).subscribe(
      (value: any) => {
        console.log(value, 'value');
        let token;
        let error;
        try {
          token = value.token.token;
        } catch (error) {
          console.log(error);
        }
        try {
          error = value[0].field;
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
        else if (error) {
          let summary, detail;
          if (error == "email") {
            summary = "Ups, tu correo";
            detail = "Revisa que tu correo electrónico sea válido";
          }
          else if (error == "password") {
            summary = "Ups, tu contraseña";
            detail = "Revisa que tu contraseña sea correcta";
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

  registrarse(): void{
    this.router.navigate(['signup']);
  }

}
