import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { environment } from 'src/environments/environment';

import { AngularFireModule } from '@angular/fire/compat'; //Para la conexion con fb
import { ReactiveFormsModule } from '@angular/forms'; //Para hacer formularios reactivos
import { AngularFireAuthModule } from '@angular/fire/compat/auth'; //Para trabajar con la autenticaciones


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase), //Aqui inicializamos firebase
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
