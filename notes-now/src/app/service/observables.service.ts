import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObservablesService {

  constructor() { }

  //Por buenas practicas se coloca ese signo $ a los objetos observables
  $modal = new EventEmitter<any>();

}
