import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesRemovedComponent } from './notes-removed.component';

describe('NotesRemovedComponent', () => {
  let component: NotesRemovedComponent;
  let fixture: ComponentFixture<NotesRemovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotesRemovedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesRemovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
