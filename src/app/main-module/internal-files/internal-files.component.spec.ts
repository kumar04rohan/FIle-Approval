import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalFilesComponent } from './internal-files.component';

describe('InternalFilesComponent', () => {
  let component: InternalFilesComponent;
  let fixture: ComponentFixture<InternalFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternalFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
