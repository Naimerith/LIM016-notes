import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { FirestoreService } from 'src/app/service/firestore.service';

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

  datosLogin: any = {
    email: '',
    displayname: '',
    photoPerfil: ''
  }

  constructor(private authService: AuthService, private router: Router, private firestore: FirestoreService) { }


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
    console.log('funciona el boton de google');
    const { email, password } = this.registerForm.value;
    const res = await this.authService.loginGoogle(email, password);
    console.log(res)
    if (res) {
      this.datosLogin.displayname = res.user?.displayName;
      this.datosLogin.email = res.user?.email;
      this.datosLogin.photoPerfil = res.user?.photoURL;
      console.log('iniciaste sesion con google', res);
      const id = res.user?.uid //obtener el id del usuario registrado en el auth
      //console.log('aqui esta el id', id);
      const nameCollection = 'Usuarios';
      await this.firestore.createDoc(this.datosLogin, nameCollection, id)
        .catch(error => {
          console.log('Hay un error en la creación de la coleccion Usuario', error)
        })
      this.router.navigate(['/inicio'])
    }
  }



}
