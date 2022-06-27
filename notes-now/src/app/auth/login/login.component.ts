import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { FirestoreService } from 'src/app/service/firestore.service';
import Swal from 'sweetalert2';

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
  async onLogin() {
    console.log('iniciaste sesión', this.registerForm.value);
    const { email, password } = this.registerForm.value;
    const res = await this.authService.login(email, password);
    if (res) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Has iniciado sesión',
        showConfirmButton: false,
        timer: 1500,
        background: '#F3E9DF',
        iconColor: '#332f2f',
      })
      //console.log("resultado", res)
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
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Has iniciado sesión',
        showConfirmButton: false,
        timer: 1500,
        background: '#F3E9DF',
        iconColor: '#332f2f',
      })
      this.datosLogin.displayname = res.user?.displayName;
      this.datosLogin.email = res.user?.email;
      this.datosLogin.photoPerfil = res.user?.photoURL;
      console.log('iniciaste sesion con google', res);
      const id = res.user?.uid //obtener el id del usuario registrado en el auth
      const nameCollection = 'Usuarios';
      await this.firestore.createDoc(this.datosLogin, nameCollection, id)
        .catch(error => {
          console.log('Hay un error en la creación de la coleccion Usuario', error)
        })
      localStorage.setItem('usuarioActivo', this.datosLogin.displayname)
      this.router.navigate(['/inicio'])
    }
  }

  ///OJO NO FUNCIONA 
  UserLogged() {
    this.authService.getUserLogged().subscribe(res => {
      const activo = res?.email;
      console.log(activo)
    })
    //Guardamos en el localStorage el usuario activo
    localStorage.setItem('usuarioActivo', this.datosLogin.email)
  }


}
