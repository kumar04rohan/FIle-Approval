import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerSharedComponent } from './manager-shared.component';

describe('ManagerSharedComponent', () => {
  let component: ManagerSharedComponent;
  let fixture: ComponentFixture<ManagerSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
