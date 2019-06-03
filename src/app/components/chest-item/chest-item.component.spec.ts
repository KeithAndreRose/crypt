import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChestItemComponent } from './chest-item.component';

describe('ChestItemComponent', () => {
  let component: ChestItemComponent;
  let fixture: ComponentFixture<ChestItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChestItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChestItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
