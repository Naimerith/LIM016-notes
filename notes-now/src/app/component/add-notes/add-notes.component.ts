import { Component, OnInit } from '@angular/core';
import { ObservablesService } from 'src/app/service/observables.service';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.scss']
})
export class AddNotesComponent implements OnInit {

  modalSwitch: boolean = false;

  constructor(private serviceModal: ObservablesService) { }


  ngOnInit(): void {

    this.serviceModal.$modal.subscribe((valor) => { //me suscribo al servicio para observar cuando cambie de valor 
      this.modalSwitch = valor; //el parametro valor tiene el valor actual que tenga modalSwitch 
    })
  }

  openModal() {
    this.modalSwitch = true;
  }


}
