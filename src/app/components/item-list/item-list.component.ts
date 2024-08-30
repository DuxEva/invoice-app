import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css',
})
export class ItemListComponent {
  items = [
    {
      name: 'Banner Design',
      quantity: 1,
      price: 300,
    },
    {
      name: 'Email Design',
      quantity: 3,
      price: 412,
    },
  ];

  addressForm!: FormGroup;
  isItemFormActive = false;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.addressForm = this.fb.group({
      name: ['', [Validators.required]],
      quantity: ['', [Validators.required], Validators.min(1)],
      price: ['', [Validators.required]],
    });
  }

  addItem() {
    if (this.addressForm.valid) {
      console.log('Form Submitted!', this.addressForm.value);
    }
  }

  toggleAddItem() {
    this.isItemFormActive = !this.isItemFormActive;
  }
}
