import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirestoreService } from 'src/app/service/firestore.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  emailPattern: any = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(this.emailPattern)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    confpassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)])
  })



  constructor(private router: Router, private authService: AuthService, private firestore: FirestoreService) { }

  ngOnInit(): void {
  }

  resetForm() {
    this.registerForm.reset();
  }
  async onRegister() {
    console.log('form....', this.registerForm.value)
    const { email, password } = this.registerForm.value;
    const result = await this.authService.register(email, password).catch(error => {
      console.log('error en Registro...', error)
    })
    if (result) {
      console.log('Registrado con éxito');
      const id = result.user?.uid //obtener el id del usuario registrado en el auth
      //console.log('aqui esta el id', id);
      const path = 'Usuarios';
      await this.firestore.createDoc(this.registerForm.value, path, id).catch(error => {
        console.log('Hay un error en la creación de la coleccion Usuario', error)
      })
      this.router.navigate(['/'])
      this.resetForm();
    }
  }


}
