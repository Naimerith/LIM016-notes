import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private authService: AuthService, private router: Router) { }
  public email: string = '';
  public password: string = '';


  ngOnInit(): void {
  }

  /****** Inicio de sesion con correo electronico *****/
  onLogin() {
    console.log('iniciaste sesión', this.registerForm.value);
    const { email, password } = this.registerForm.value;
    const res = this.authService.login(email, password);
    if (res) {
      console.log("resultado", res)
    }
    this.router.navigate(['/inicio'])
  }

  /****** Inicio de sesion con Google *****/
  async loginWithGoogle() {
    console.log('funciona el boton')
    try {
      const res = this.authService.loginGoogle(this.email, this.password);
      if (res) {
        console.log('iniciaste sesion con google', res)
      }
      this.router.navigate(['/inicio'])
    }
    catch (error) { console.log(error) }
  }
}
