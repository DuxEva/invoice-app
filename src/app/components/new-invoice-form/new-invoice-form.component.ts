import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as InvoiceActions from '../../store/invoice/invoice.actions';
import { Invoice, Item } from '../../model/types.model';

@Component({
  selector: 'app-new-invoice-form',
  templateUrl: './new-invoice-form.component.html',
  styleUrls: ['./new-invoice-form.component.css'],
})
export class NewInvoiceFormComponent {
  addressForm!: FormGroup;
  @Input() isOpen = false;
  items: Item[] = [];

  constructor(private fb: FormBuilder, private store: Store) {
    this.createForm();
  }

  createForm() {
    this.addressForm = this.fb.group({
      senderStreet: ['', [Validators.required, Validators.minLength(5)]],
      senderCity: ['', [Validators.required]],
      senderCountry: ['', [Validators.required]],
      senderPostalCode: [
        '',
        [
          Validators.required,
          Validators.pattern('^[A-Z0-9]{3}[A-Z0-9 ]{0,3}[A-Z0-9]{3}$'),
        ],
      ],
      clientName: ['', [Validators.required]],
      clientEmail: ['', [Validators.required, Validators.email]],
      clientStreet: ['', [Validators.required]],
      clientCity: ['', [Validators.required]],
      clientCountry: ['', [Validators.required]],
      clientPostalCode: [
        '',
        [
          Validators.required,
          Validators.pattern('^[A-Z0-9]{3}[A-Z0-9 ]{0,3}[A-Z0-9]{3}$'),
        ],
      ],
      invoiceDate: ['', [Validators.required]],
      paymentTerms: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.items.length !== 0) {
      const newInvoice: Invoice = {
        id: this.generateInvoiceId(),
        createdAt: this.addressForm.value.invoiceDate,
        paymentDue: this.calculatePaymentDue(),
        description: this.addressForm.value.description,
        paymentTerms: this.addressForm.value.paymentTerms,
        clientName: this.addressForm.value.clientName,
        clientEmail: this.addressForm.value.clientEmail,
        status: 'pending',
        senderAddress: {
          street: this.addressForm.value.senderStreet,
          city: this.addressForm.value.senderCity,
          postCode: this.addressForm.value.senderPostalCode,
          country: this.addressForm.value.senderCountry,
        },
        clientAddress: {
          street: this.addressForm.value.clientStreet,
          city: this.addressForm.value.clientCity,
          postCode: this.addressForm.value.clientPostalCode,
          country: this.addressForm.value.clientCountry,
        },
        items: this.items,
        total: this.calculateTotal(),
      };
      this.store.dispatch(InvoiceActions.addInvoice({ invoice: newInvoice }));
      this.resetForm();
    } else {
      console.error('Form is invalid or no items added');
    }
  }

  onCancel() {
    this.resetForm();
    this.isOpen = false;
  }

  addItemToInvoice(item: Item) {
    if (
      item &&
      !this.items.some((existingItem) => existingItem.name === item.name)
    ) {
      this.items.push(item);
    }
  }

  removeItemFromInvoice(index: number) {
    if (index >= 0 && index < this.items.length) {
      this.items.splice(index, 1);
    }
  }

  private generateInvoiceId(): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const firstLetter = letters[Math.floor(Math.random() * 26)];
    const secondLetter = letters[Math.floor(Math.random() * 26)];
    const prefix = `${firstLetter}${secondLetter}`;
    const numbers = '0123456789';
    const randomPart = Array.from(
      { length: 2 },
      () => numbers[Math.floor(Math.random() * 10)]
    ).join('');
    const datePart = new Date().getFullYear().toString().slice(-2);
    return `${prefix}${datePart}${randomPart}`;
  }

  private calculateTotal(): number {
    return this.items.reduce((total, item) => total + item.total, 0);
  }

  private calculatePaymentDue(): string {
    const invoiceDate = new Date(this.addressForm.value.invoiceDate);
    invoiceDate.setDate(
      invoiceDate.getDate() + this.addressForm.value.paymentTerms
    );
    return invoiceDate.toISOString().split('T')[0];
  }

  private resetForm() {
    this.addressForm.reset();
    this.items = [];
    this.addressForm.markAsPristine();
    this.addressForm.markAsUntouched();
  }
}
