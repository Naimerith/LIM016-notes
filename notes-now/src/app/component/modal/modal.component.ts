import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Interface } from 'src/app/interface/interface';
import { FirestoreService } from 'src/app/service/firestore.service';
import { ObservablesService } from 'src/app/service/observables.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  formNote: FormGroup;

  constructor(private serviceModal: ObservablesService, private fb: FormBuilder, private firestore: FirestoreService) {
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
    console.log(this.formNote);
    const NOTENOW: Interface = {
      title: this.formNote.value.title,
      contentNote: this.formNote.value.contentNote,
      date: new Date()
    }
    console.log(NOTENOW);
    this.firestore.AddNoteFb(NOTENOW)
      .then(() => {
        console.log('Se agrego la nota a firebase')
      })
      .catch((error) => console.log('hay un error', error))
  }



}
