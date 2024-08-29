import { Component, Input } from '@angular/core';
import { Invoice } from '../../model/types.model';

@Component({
  selector: 'app-invoice-item-card',
  templateUrl: './invoice-item-card.component.html',
  styleUrl: './invoice-item-card.component.css',
})
export class InvoiceItemCardComponent {
  @Input() invoice!: Invoice;
item: any;
}
