import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPieceComponent } from './new-piece.component';

describe('NewPieceComponent', () => {
  let component: NewPieceComponent;
  let fixture: ComponentFixture<NewPieceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPieceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
