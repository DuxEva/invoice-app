import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Invoice } from '../../model/types.model';
import { selectInvoices } from '../../store/invoice/invoice.selector';
import * as InvoiceActions from '../../store/invoice/invoice.actions';
import { AppState } from '../../model/types.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  invoices$!: Observable<Invoice[]>;
  @Input() isOpen = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(InvoiceActions.loadInvoices());
    this.invoices$ = this.store.pipe(select(selectInvoices));
  }
}
