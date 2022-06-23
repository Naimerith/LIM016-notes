import { Component, OnInit } from '@angular/core';
import { Interface } from '../../interface/interface';
import { FirestoreService } from 'src/app/service/firestore.service';
import { ObservablesService } from 'src/app/service/observables.service';

import { faPencil, faTag, faImage, faFileArrowDown, faTrash } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-notes-removed',
  templateUrl: './notes-removed.component.html',
  styleUrls: ['./notes-removed.component.scss']
})
export class NotesRemovedComponent implements OnInit {
  //Iconos de Fontawesome
  faPencil = faPencil;
  faTag = faTag;
  faImage = faImage;
  faRemove = faTrash;
  faFile = faFileArrowDown;

  public interface: Interface[] = []
  modalMenu: boolean = false;

  constructor(private firestore: FirestoreService, private serviceModal: ObservablesService) { }

  ngOnInit(): void {
    this.serviceModal.$modal.subscribe((valor) => { //me suscribo al servicio para observar cuando cambie de valor 
      this.modalMenu = valor; //el parametro valor tiene el valor actual que tenga modalMenu
    })

    this.getAllNotes() //Obtenemos todas las notas en tiempo real 
  }

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

  /* Abrir menu de cada nota */
  openMenu(e: any) {
    this.modalMenu = true;
    console.log('diste click al menu');
  }

  /* Cerrar menu de cada nota */
  closeMenu() {
    this.serviceModal.$modal.emit(false) //Emitimos el valor false
  }

  /* Eliminamos las nota definitivamente de la colección */
  btnDelete(id: any) {
    //console.log(id)
    this.firestore.deleteNotes(id).then(() => {
      console.log('Se elimino la nota correctamente')
    }, error => { console.log('Se genero un error', error) }
    )
  }

  /* Filtrar por notas eliminadas */
  filterNotesNow() {
    return this.interface = this.interface.filter(notes => notes.status === 'Nota eliminada');
  }



  btnRestaure(e: any) {
    //console.log('diste click a Archivar');
    const archiveId = e.target.id;
    console.log(archiveId);
    this.firestore.statusNotes(archiveId, 'Nota nueva');
    //this.statusPedido(orderId);
    //this.getOrderFilter();
    //this.getIdItemsServed()
    //this.getId();
  };
}

