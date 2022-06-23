import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Interface } from 'src/app/interface/interface';
import { FirestoreService } from 'src/app/service/firestore.service';
import { ObservablesService } from 'src/app/service/observables.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  formNote: FormGroup;

  constructor(
    private serviceModal: ObservablesService,
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

  /* Cerrar modal de agregar nota */
  closeModal() {
    this.serviceModal.$modal.emit(false) //Emitimos el valor false
  }


  /**** Agregar notas a la coleccion ****/
  async AddNote() {
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
          timer: 1000
        })
        this.router.navigate(['/notas'])
      })
      .catch((error) => console.log('hay un error', error))
  }

}
