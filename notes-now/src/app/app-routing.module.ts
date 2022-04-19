import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ArchivedNotesComponent } from './component/archived-notes/archived-notes.component';
import { HomeComponent } from './component/home/home.component';
import { MyNotesComponent } from './component/my-notes/my-notes.component';
import { NotesRemovedComponent } from './component/notes-removed/notes-removed.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'registro',
    component: RegisterComponent,
  },
  {
    path: 'inicio',
    component: HomeComponent,
  },
  {
    path: 'notas',
    component: MyNotesComponent,
  },
  {
    path: 'archivadas',
    component: ArchivedNotesComponent,
  },
  {
    path: 'eliminadas',
    component: NotesRemovedComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
