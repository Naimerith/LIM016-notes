import { EventEmitter, Injectable } from '@angular/core';
import { Interface } from '../interface/interface';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservablesService {

  private note$ = new Subject<any>()

  //Por buenas practicas se coloca ese signo $ a los objetos observables
  $modal = new EventEmitter<any>();

  constructor() { }

  //Mètodo para agregar valores a la nota 
  addNoteEdit(note: Interface) {
    this.note$.next(note); //Este método next emite el nuevo valor que recibe del parametro
  }

  //Método para obtener los valores de la nota y poder editarlos
  getNoteEdit(): Observable<Interface> {
    return this.note$.asObservable(); //con este método los otros componentes se suscriben a él
  }

}
