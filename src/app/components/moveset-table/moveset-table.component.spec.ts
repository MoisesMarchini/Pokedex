import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovesetTableComponent } from './moveset-table.component';

describe('MovesetTableComponent', () => {
  let component: MovesetTableComponent;
  let fixture: ComponentFixture<MovesetTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovesetTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovesetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
