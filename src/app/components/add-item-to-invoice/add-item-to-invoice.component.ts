import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../../model/types.model';

@Component({
  selector: 'app-add-item-to-invoice',
  templateUrl: './add-item-to-invoice.component.html',
  styleUrl: './add-item-to-invoice.component.css',
})
export class AddItemToInvoiceComponent {
  @Input() items: Item[] = [];
  @Output() removeItem = new EventEmitter<number>();

  onRemoveItem(index: number) {
    this.removeItem.emit(index);
  }
}
