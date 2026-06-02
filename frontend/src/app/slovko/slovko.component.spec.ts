import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import { SlovkoComponent } from './slovko.component';
import { SlovkoService } from '../slovko.service';

describe('SlovkoComponent', () => {
  let component: SlovkoComponent;
  let fixture: ComponentFixture<SlovkoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlovkoComponent ],
      providers: [
        {
          provide: SlovkoService,
          useValue: {
            getWords: () => of([]),
            sendFilter: () => of([])
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
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
