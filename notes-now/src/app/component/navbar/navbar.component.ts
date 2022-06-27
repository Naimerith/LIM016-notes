import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  /****** Cerrar sesión *****/
  logoutUser() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Has cerrado sesión',
      showConfirmButton: false,
      timer: 1500,
      background: '#F3E9DF',
      iconColor: '#332f2f',
    })
    console.log('Se ha cerrado sesión')
    this.authService.logout()
    this.router.navigate(['/'])
  }

}
