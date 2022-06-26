import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Interface } from '../../interface/interface';
import { FirestoreService } from 'src/app/service/firestore.service';
import { ObservablesService } from 'src/app/service/observables.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.scss']
})
export class AddNotesComponent implements OnInit {

  formNote: FormGroup;
  @Output() newEvent = new EventEmitter<string>();
  public newDate = Date.now();

  constructor(
    private obs: ObservablesService,
    private fb: FormBuilder,
    private firestore: FirestoreService,
    private router: Router) {

    this.formNote = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(30)]],
      contentNote: ['', [Validators.required, Validators.maxLength(3000)]],
    })
  }


  ngOnInit(): void {
  }

  /**** Agregar notas a la coleccion ****/
  async AddNote(value: string) {
    const newDate = Date.now()
    const usuarioActivo = localStorage.getItem('usuarioActivo');
    const notenow: Interface = {
      title: this.formNote.value.title,
      contentNote: this.formNote.value.contentNote,
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
          timer: 1000,
          color: '#0e0d0d',
          background: 'rgba(239, 151, 151, 1)',
          iconColor: '#332f2f'
        })
        //this.router.navigate(['/notas'])
        this.formNote.reset()
        this.newEvent.emit(value);
      })
      .catch((error) => console.log('hay un error', error))
  }



}
