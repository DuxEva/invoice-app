import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import * as InvoiceActions from '../../store/invoice/invoice.actions';
import { ToastrService } from 'ngx-toastr';
import { Invoice, Item } from '../../model/types.model';
import { ActivatedRoute } from '@angular/router';
import { selectInvoiceById } from '../../store/invoice/invoice.selector';

@Component({
  selector: 'app-new-invoice-form',
  templateUrl: './new-invoice-form.component.html',
  styleUrls: ['./new-invoice-form.component.css'],
})
export class NewInvoiceFormComponent implements OnInit {
  addressForm!: FormGroup;
  @Output() isFormOpen = new EventEmitter();
  @Input() isOpen = false;
  items: Item[] = [];
  @Input() Invoice: Invoice | undefined;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.createForm();
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.store.pipe(select(selectInvoiceById(id))).subscribe((invoice) => {
        this.Invoice = invoice;
      });
    }

    if (this.Invoice) {
      this.populateFormForEdit();
    }
  }

  createForm() {
    this.addressForm = this.fb.group({
      senderStreet: ['', [Validators.required, Validators.minLength(5)]],
      senderCity: ['', [Validators.required]],
      senderCountry: ['', [Validators.required]],
      senderPostalCode: ['', [Validators.required]],
      clientName: ['', [Validators.required]],
      clientEmail: ['', [Validators.required, Validators.email]],
      clientStreet: ['', [Validators.required]],
      clientCity: ['', [Validators.required]],
      clientCountry: ['', [Validators.required]],
      clientPostalCode: ['', [Validators.required]],
      invoiceDate: ['', [Validators.required]],
      paymentTerms: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  populateFormForEdit() {
    // Populate the form if editing an existing invoice
    this.addressForm.patchValue({
      senderStreet: this.Invoice?.senderAddress.street,
      senderCity: this.Invoice?.senderAddress.city,
      senderCountry: this.Invoice?.senderAddress.country,
      senderPostalCode: this.Invoice?.senderAddress.postCode,
      clientName: this.Invoice?.clientName,
      clientEmail: this.Invoice?.clientEmail,
      clientStreet: this.Invoice?.clientAddress.street,
      clientCity: this.Invoice?.clientAddress.city,
      clientCountry: this.Invoice?.clientAddress.country,
      clientPostalCode: this.Invoice?.clientAddress.postCode,
      invoiceDate: this.Invoice?.createdAt,
      paymentTerms: this.Invoice?.paymentTerms,
      description: this.Invoice?.description,
    });
    this.items = this.Invoice?.items || [];
  }

  onSubmit(status: string) {
    if (this.addressForm.invalid || this.items.length === 0) {
      this.markFormAsTouched();
      return;
    }

    const newInvoice: Invoice = {
      id: this.generateInvoiceId(),
      createdAt: this.findCreatedAt(),
      paymentDue: this.addressForm.value.paymentDue,
      description: this.addressForm.value.description,
      paymentTerms: this.addressForm.value.paymentTerms,
      clientName: this.addressForm.value.clientName,
      clientEmail: this.addressForm.value.clientEmail,
      status: status,
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
    this.isFormOpen.emit();
  }

  onCancel() {
    this.resetForm();
    this.isFormOpen.emit();
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

  private findCreatedAt(): string {
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

  markFormAsDirty() {
    this.addressForm.markAsTouched();
  }

  markFormAsTouched() {
    Object.keys(this.addressForm.controls).forEach((key) => {
      this.addressForm.get(key)?.markAsTouched();
    });
  }
}
