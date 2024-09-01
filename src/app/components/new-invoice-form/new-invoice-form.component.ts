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
    const date = new Date();
    if (this.addressForm.valid) {
      const newInvoice: Invoice = {
        id: this.generateInvoiceId(),
        ...this.addressForm.value,
        status: 'pending',
        createdAt: `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`,
        items: [],
        total: 0,
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
    const letter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const firstLetter = letter[Math.floor(Math.random() * 26)];
    const secondLetter = letter[Math.floor(Math.random() * 26)];
    const prefix = `${firstLetter}${secondLetter}`;
    const numbers = '0123456789';
    const randomPart = Array.from(
      { length: 2 },
      () => numbers[Math.floor(Math.random() * 10)]
    ).join('');
    const datePart = new Date().getFullYear().toString().slice(-2);
    return `${prefix}${datePart}${randomPart}`;
  }
}
