import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlovkoComponent } from './slovko.component';

describe('SlovkoComponent', () => {
  let component: SlovkoComponent;
  let fixture: ComponentFixture<SlovkoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlovkoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlovkoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
