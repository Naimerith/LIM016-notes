import { Component, OnInit } from '@angular/core';
import { Interface } from '../../interface/interface';
import { FirestoreService } from 'src/app/service/firestore.service';
import { ObservablesService } from 'src/app/service/observables.service';

@Component({
  selector: 'app-my-notes',
  templateUrl: './my-notes.component.html',
  styleUrls: ['./my-notes.component.scss']
})
export class MyNotesComponent implements OnInit {

  public interface: Interface[] = []
  modalMenu: boolean = false;

  constructor(private firestore: FirestoreService, private serviceModal: ObservablesService) { }

  ngOnInit(): void {
    this.serviceModal.$modal.subscribe((valor) => { //me suscribo al servicio para observar cuando cambie de valor 
      this.modalMenu = valor; //el parametro valor tiene el valor actual que tenga modalMenu
    })

    this.firestore.getNotes().subscribe(
      (notes: any) => {
        this.interface = notes;
        console.log(notes)
      }
    );
  }

  openMenu() {
    this.modalMenu = true;
  }

  /* Cerrar modal de agregar nota */
  closeMenu() {
    this.serviceModal.$modal.emit(false) //Emitimos el valor false
  }

}
