import { Component, OnInit } from '@angular/core';
import { ObservablesService } from 'src/app/service/observables.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(private serviceModal: ObservablesService) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.serviceModal.$modal.emit(false) //Emitimos el valor false
  }

  saveNote() { }

}
