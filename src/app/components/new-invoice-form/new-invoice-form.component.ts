import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as InvoiceActions from '../../store/invoice/invoice.actions';
import { Invoice } from '../../model/types.model';

@Component({
  selector: 'app-new-invoice-form',
  templateUrl: './new-invoice-form.component.html',
  styleUrl: './new-invoice-form.component.css',
})
export class NewInvoiceFormComponent {
  addressForm!: FormGroup;
  @Input() isOpen = false;

  constructor(private fb: FormBuilder, private store: Store) {
    this.createForm();
  }

  createForm() {
    this.addressForm = this.fb.group({
      street: ['', [Validators.required, Validators.minLength(5)]],
      city: ['', [Validators.required]],
      county: ['', [Validators.required]],
      postalCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      clientName: ['', [Validators.required]],
      clientEmail: ['', [Validators.required, Validators.email]],
      clientAddress: ['', [Validators.required]],
      clientCity: ['', [Validators.required]],
      clientCountry: ['', [Validators.required]],
      clientPostalCode: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{5}$')],
      ],
      invoiceDate: ['', [Validators.required]],
      paymentTerms: ['', [Validators.required]],
      projectDescription: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.addressForm.valid) {
      const newInvoice: Invoice = {
        id: this.generateInvoiceId(),
        ...this.addressForm.value,
        status: 'pending',
        items: [], // You might want to add an item list to your form
        total: 0, // Calculate the total based on items
      };
      this.store.dispatch(InvoiceActions.addInvoice({ invoice: newInvoice }));
      console.log('New invoice added:', newInvoice);
      this.addressForm.reset();
      this.isOpen = false;
    } else {
      console.log('Form is invalid');
    }
  }

  onCancel() {
    this.isOpen = false;
    this.addressForm.reset();
  }

  private generateInvoiceId(): string {
    // Generate a unique invoice ID (you might want to use a more robust method)
    return 'INV-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }
}
