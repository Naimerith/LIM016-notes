import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

registerForm = new FormGroup({
  email: new FormControl (''),
  password: new FormControl ('')
})

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  onRegister(){
    console.log('form....', this.registerForm.value)
    const {email, password} = this.registerForm.value;
    this.authService.register(email, password);
  }
  

}
