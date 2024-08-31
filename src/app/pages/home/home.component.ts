import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Invoice, InvoiceState } from '../../model/types.model';
import { selectInvoices } from '../../store/invoice/invoice.selector';
import * as InvoiceActions from '../../store/invoice/invoice.actions';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  invoices$!: Observable<Invoice[]>;
  isOpen = true;

  constructor(private store: Store<InvoiceState>) {}

  ngOnInit(): void {
    this.store.dispatch(InvoiceActions.loadInvoices());
    this.invoices$ = this.store.pipe(select(selectInvoices));
  }

  onToggleForm() {
    this.isOpen = !this.isOpen;
  }
}
