import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoactividadPage } from './infoactividad.page';

describe('InfoactividadPage', () => {
  let component: InfoactividadPage;
  let fixture: ComponentFixture<InfoactividadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoactividadPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoactividadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
