import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authfb: AngularFireAuth, private firestore: AngularFirestore) { }


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

  /******Obtener Usuario Logueado *****/
  getUserLogged() {
    return this.authfb.authState;
  }

  /****** Cerrar sesión *****/
  async logout() {
    await this.authfb.signOut();
    localStorage.removeItem("usuarioActivo");
  }


}
