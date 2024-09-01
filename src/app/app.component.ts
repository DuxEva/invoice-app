import { Component, ElementRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { InvoiceState } from './model/types.model';
import { selectInvoices } from './store/invoice/invoice.selector';
import * as InvoiceActions from './store/invoice/invoice.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private store: Store<InvoiceState>, private eRef: ElementRef) {}

  ngOnInit(): void {
    this.store.dispatch(InvoiceActions.loadInvoices());
  }
}
