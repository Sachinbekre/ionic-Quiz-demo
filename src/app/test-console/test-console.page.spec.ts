import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestConsolePage } from './test-console.page';

describe('TestConsolePage', () => {
  let component: TestConsolePage;
  let fixture: ComponentFixture<TestConsolePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestConsolePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestConsolePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
