import { Component, Input } from '@angular/core';
import { Invoice } from '../../model/types.model';

@Component({
  selector: 'app-invoice-card',
  templateUrl: './invoice-card.component.html',
  styleUrl: './invoice-card.component.css',
})
export class InvoiceCardComponent {
  @Input() invoice?: Invoice;
}
