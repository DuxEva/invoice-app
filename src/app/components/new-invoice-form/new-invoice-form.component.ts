import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-invoice-form',
  templateUrl: './new-invoice-form.component.html',
  styleUrl: './new-invoice-form.component.css',
})
export class NewInvoiceFormComponent {
  addressForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.addressForm = this.fb.group({
      street: ['', [Validators.required, Validators.minLength(5)]],
      city: ['', [Validators.required]],
      county: ['', [Validators.required]],
      postalCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      clientName: ['', [Validators.required]],
      clientEmail: ['', [Validators.required]],
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
      console.log('Form Submitted!', this.addressForm.value);
    }
  }
}
