import { Component, Input } from '@angular/core';
import { Invoice } from '../../model/types.model';

@Component({
  selector: 'app-invoice-status',
  templateUrl: './invoice-status.component.html',
  styleUrl: './invoice-status.component.css',
})
export class InvoiceStatusComponent {
  @Input() invoice!: Invoice;
}
