import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Interface } from 'src/app/interface/interface';
import { FirestoreService } from 'src/app/service/firestore.service';
import { ObservablesService } from 'src/app/service/observables.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  formNote: FormGroup;

  constructor(private serviceModal: ObservablesService, private fb: FormBuilder, private firestore: FirestoreService, private router: Router) {
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

  async AddNote() {
    const date = new Date();
    const newDate = Date.now()
    console.log(this.formNote);
    const usuarioActivo = localStorage.getItem('usuarioActivo');
    const notenow: Interface = {
      title: this.formNote.value.title,
      contentNote: this.formNote.value.contentNote,
      date: newDate,
      status: 'Nota nueva',
      user: usuarioActivo,
      id: '',
    }
    // console.log(notenow);
    this.firestore.AddNoteFb(notenow)
      .then(() => {
        console.log('Se agrego la nota a firebase')
        this.router.navigate(['/notas'])
      })
      .catch((error) => console.log('hay un error', error))
  }

}
