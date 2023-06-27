import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovesetComponent } from './moveset-table.component';

describe('MovesetTableComponent', () => {
  let component: MovesetComponent;
  let fixture: ComponentFixture<MovesetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovesetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovesetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
