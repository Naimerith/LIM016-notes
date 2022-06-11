import { Component, OnInit } from '@angular/core';
import { Interface } from '../../interface/interface';
import { FirestoreService } from 'src/app/service/firestore.service';

@Component({
  selector: 'app-my-notes',
  templateUrl: './my-notes.component.html',
  styleUrls: ['./my-notes.component.scss']
})
export class MyNotesComponent implements OnInit {

  public interface: Interface[] = []

  constructor(private firestore: FirestoreService) { }

  ngOnInit(): void {
    this.firestore.getNotes().subscribe(
      (notes: any) => {
        this.interface = notes;
        console.log(notes)
      }
    );
  }

}
