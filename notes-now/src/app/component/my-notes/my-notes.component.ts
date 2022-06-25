import { Component, OnInit } from '@angular/core';
import { Interface } from '../../interface/interface';
import { FirestoreService } from 'src/app/service/firestore.service';
import { ObservablesService } from 'src/app/service/observables.service';

import { faPencil, faTag, faImage, faFileArrowDown, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-my-notes',
  templateUrl: './my-notes.component.html',
  styleUrls: ['./my-notes.component.scss']
})
export class MyNotesComponent implements OnInit {

  //Iconos de Fontawesome
  faPencil = faPencil;
  faTag = faTag;
  faImage = faImage;
  faRemove = faTrash;
  faFile = faFileArrowDown;
  filterNotes = '';

  public interface: Interface[] = []
  notes: any;
  formNoteEdit: FormGroup;
  id: string | undefined;

  constructor(private firestore: FirestoreService, private obs: ObservablesService, private fb: FormBuilder, private router: Router,) {
    this.formNoteEdit = this.fb.group({
      title: ['', []],
      contentNote: ['', []],
    })
  }

  ngOnInit(): void {

    this.getAllNotes() //Obtenemos todas las notas en tiempo real

    //Obtener la nota que quiero editar
    this.obs.getNoteEdit().subscribe(data => {
      console.log(data)
      this.id = data.id;
      this.formNoteEdit.patchValue({
        title: data.title,
        contentNote: data.contentNote,
        date: data.date
      })
    })
  }

  //Obtenemos todas las notas 
  getAllNotes() {
    this.firestore.getNotes().subscribe(doc => {
      //console.log(doc)
      this.interface = [];
      doc.forEach((el: any) => {
        this.interface.push({
          id: el.payload.doc.id,
          ...el.payload.doc.data()
        })
      });
      this.filterNotesNow() //metodo que muestra solo las notas con estatus nuevas 
    })
  }

  /* Filtrar por notas nuevas */
  filterNotesNow() {
    return this.interface = this.interface.filter(notes => notes.status === 'Nota nueva');
  }

  /* Eliminamos las notas y enviamos a la papelera*/
  btnDelete(e: any) {
    //console.log('diste click a eliminar');
    const deleteId = e.target.id;
    console.log(deleteId);
    this.firestore.statusNotes(deleteId, 'Nota eliminada');

  };

  /* Archivar  las notas*/
  btnArchive(e: any) {
    //console.log('diste click a Archivar');
    const archiveId = e.target.id;
    console.log(archiveId);
    this.firestore.statusNotes(archiveId, 'Nota archivada');
  };

  /* btn que abre modal para comenzar a Editar  las notas*/
  btnEdit(note: Interface) {
    //console.log('diste click en editar');
    this.obs.addNoteEdit(note);
  }

  /* Guardar nota editada  */
  savedNote() {
    if (this.id === undefined) { //si no hay informacion 
      //creamos una nueva nota
      this.addNoteNow()
    } else {
      //Guardamos la nota ya editada
      this.editNote(this.id)
    }
  }

  /* Editar la nota  */
  editNote(id: string) {
    const newDate = Date.now()
    const usuarioActivo = localStorage.getItem('usuarioActivo');
    const notenow: Interface = {
      title: this.formNoteEdit.value.title,
      contentNote: this.formNoteEdit.value.contentNote,
      date: newDate,
      status: 'Nota nueva',
      user: usuarioActivo
    }
    Swal.fire({
      title: 'Esta seguro que quiere editar esta nota?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Nota Editada!', '', 'success')
        this.firestore.editNotes(id, notenow).then(() => {
          console.log('Se edito la nota ')
          this.formNoteEdit.reset();
          this.id = undefined;
        }, error => {
          console.log('No se pudo editar la nota ')
        })
      } else if (result.isDenied) {
        Swal.fire('La nota no se edito', '', 'info')
      }
    })
  }

  //Agregamos una nota nueva
  addNoteNow() {
    const newDate = Date.now()
    const usuarioActivo = localStorage.getItem('usuarioActivo');
    const notenow: Interface = {
      title: this.formNoteEdit.value.title,
      contentNote: this.formNoteEdit.value.contentNote,
      date: newDate,
      status: 'Nota nueva',
      user: usuarioActivo
    }
    this.firestore.AddNoteFb(notenow)
      .then(() => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'La nota fue agregada',
          width: 400,
          showConfirmButton: false,
          timer: 1000
        })
      })
      .catch((error) => console.log('hay un error', error))
  }

}

