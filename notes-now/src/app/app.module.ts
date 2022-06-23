import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { environment } from 'src/environments/environment';

//import { GoogleMapsModule } from '@angular/google-maps';
//import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire/compat'; //Para la conexion con fb
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; //Para hacer formularios reactivos
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { HomeComponent } from './component/home/home.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { HeaderComponent } from './component/header/header.component';
import { MyNotesComponent } from './component/my-notes/my-notes.component';
import { ArchivedNotesComponent } from './component/archived-notes/archived-notes.component';
import { NotesRemovedComponent } from './component/notes-removed/notes-removed.component';
import { AddNotesComponent } from './component/add-notes/add-notes.component';
import { ModalComponent } from './component/modal/modal.component';
//import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GoogleMapsComponent } from './component/google-maps/google-maps.component';




@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    PageNotFoundComponent,
    HomeComponent,
    NavbarComponent,
    HeaderComponent,
    MyNotesComponent,
    ArchivedNotesComponent,
    NotesRemovedComponent,
    AddNotesComponent,
    ModalComponent,
    GoogleMapsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase), //Aqui inicializamos firebase
    FontAwesomeModule,
    // BrowserAnimationsModule, // Modulo de animaciones requerido
    // ToastrModule.forRoot(), //  Agregamos ToastrModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
