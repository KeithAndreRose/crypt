import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncryptionAnimComponent } from './encryption-anim.component';

describe('EncryptionAnimComponent', () => {
  let component: EncryptionAnimComponent;
  let fixture: ComponentFixture<EncryptionAnimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncryptionAnimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncryptionAnimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
