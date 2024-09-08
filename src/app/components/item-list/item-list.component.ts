import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from '../../model/types.model';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css',
})
export class ItemListComponent {
  @Output() addItem = new EventEmitter<Item>();
  @Output() removeItem = new EventEmitter<number>();

  itemForm!: FormGroup;
  isItemFormActive = false;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.itemForm = this.fb.group({
      name: ['', [Validators.required]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]],
    });
  }

  onAddItem() {
    if (this.itemForm.valid) {
      const newItem: Item = {
        name: this.itemForm.value.name,
        quantity: this.itemForm.value.quantity,
        price: this.itemForm.value.price,
        total: this.itemForm.value.quantity * this.itemForm.value.price,
      };
      this.addItem.emit(newItem);
      this.itemForm.reset();
      this.toggleAddItem();
    }
  }

  onRemoveItem(index: number) {
    this.removeItem.emit(index);
  }

  toggleAddItem() {
    this.isItemFormActive = !this.isItemFormActive;
  }
}
