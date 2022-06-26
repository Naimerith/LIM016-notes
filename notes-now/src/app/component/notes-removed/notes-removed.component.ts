import { Component, OnInit } from '@angular/core';
import { Interface } from '../../interface/interface';
import { FirestoreService } from 'src/app/service/firestore.service';
import { ObservablesService } from 'src/app/service/observables.service';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-notes-removed',
  templateUrl: './notes-removed.component.html',
  styleUrls: ['./notes-removed.component.scss']
})
export class NotesRemovedComponent implements OnInit {
  //Iconos de Fontawesome
  faPlus = faPlus;

  public interface: Interface[] = []

  constructor(private firestore: FirestoreService, private serviceModal: ObservablesService) { }

  ngOnInit(): void {

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


  /* Eliminamos las nota definitivamente de la colección */
  btnDelete(id: any) {
    Swal.fire({
      title: 'Esta seguro que quiere eliminar esta nota defiitivamente?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Ok',
      denyButtonText: `No`,
      color: '#0e0d0d',
      background: '#F3E9DF',
      iconColor: '#332f2f',
      confirmButtonColor: '#0cf058',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Nota Eliminada!', 'Esta nota no podrá recuperarse', 'success')
        this.firestore.deleteNotes(id).then(() => {
          console.log('Se elimino la nota correctamente')
        }, error => { console.log('Se genero un error', error) }
        )
      } else if (result.isDenied) {
        Swal.fire('La nota no se elimino', '', 'info')
      }
    })


    //console.log(id)

  }

  /* Filtrar por notas eliminadas */
  filterNotesNow() {
    return this.interface = this.interface.filter(notes => notes.status === 'Nota eliminada');
  }



  btnRestaure(e: any) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'La nota fue restaurada',
      width: 400,
      showConfirmButton: false,
      timer: 1500,
      color: '#0e0d0d',
      background: 'rgba(239, 151, 151, 1)',
      iconColor: '#332f2f'
    })
    const archiveId = e.target.id;
    console.log(archiveId);
    this.firestore.statusNotes(archiveId, 'Nota nueva');
  };
}

