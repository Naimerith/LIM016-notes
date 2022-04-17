import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authfb: AngularFireAuth) { }

  /****** Registro de Usuario *****/
  async register(email: string, password: string) {
    try {
      return await this.authfb.createUserWithEmailAndPassword(email, password)
    } catch (err) {
      console.log('error en registro', err)
      return null;
    }
  }

   /****** Inicio de sesion con correo eletronico *****/
   async login(email: string, password: string) {
    try {
      return await this.authfb.signInWithEmailAndPassword(email, password)
    } catch (err) {
      console.log('error en login', err)
      return null;
    }
   }

  /****** Inicio de sesion con Google *****/
  async loginGoogle(email: string, password: string) {
    try {
      return await this.authfb.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    } catch (err) {
      console.log('error en login con google', err)
      return null;
    }
  }

    /****** Cerrar sesión *****/
  async logout(){
    await this.authfb.signOut();
  }
}
