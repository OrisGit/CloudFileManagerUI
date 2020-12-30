import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformTableComponent } from './platform-table.component';

describe('PlatformTableComponent', () => {
  let component: PlatformTableComponent;
  let fixture: ComponentFixture<PlatformTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatformTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
