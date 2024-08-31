import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemToInvoiceComponent } from './add-item-to-invoice.component';

describe('AddItemToInvoiceComponent', () => {
  let component: AddItemToInvoiceComponent;
  let fixture: ComponentFixture<AddItemToInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddItemToInvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddItemToInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
