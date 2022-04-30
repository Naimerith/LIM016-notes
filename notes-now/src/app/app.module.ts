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
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { HomeComponent } from './component/home/home.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { HeaderComponent } from './component/header/header.component';
import { MyNotesComponent } from './component/my-notes/my-notes.component';
import { ArchivedNotesComponent } from './component/archived-notes/archived-notes.component';
import { NotesRemovedComponent } from './component/notes-removed/notes-removed.component';
import { AddNotesComponent } from './component/add-notes/add-notes.component';
import { ModalComponent } from './component/modal/modal.component';
import { FormsModule } from '@angular/forms';


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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase), //Aqui inicializamos firebase
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
