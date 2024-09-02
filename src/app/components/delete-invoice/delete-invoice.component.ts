import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import * as InvoiceActions from '../../store/invoice/invoice.actions';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-invoice',
  templateUrl: './delete-invoice.component.html',
  styleUrl: './delete-invoice.component.css',
})
export class DeleteInvoiceComponent {
  @Input() isOpen? = false;
  @Input() invoiceId!: string;
  @Output() isOpenChange = new EventEmitter();

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.invoiceId = id;
    }
  }

  onDelete() {
    this.store.dispatch(InvoiceActions.deleteInvoice({ id: this.invoiceId }));
    this.isOpen = false;
    this.router.navigate(['/']);
  }

  onCancel() {
    this.isOpenChange.emit();
  }
}
