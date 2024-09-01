import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Invoice } from '../../model/types.model';
import { select, Store } from '@ngrx/store';
import * as InvoiceActions from '../../store/invoice/invoice.actions';
import { ActivatedRoute, Router } from '@angular/router';
import {
  selectError,
  selectInvoiceById,
} from '../../store/invoice/invoice.selector';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrl: './invoice-details.component.css',
})
export class InvoiceDetailsComponent implements OnInit {
  invoice: Invoice | undefined;
  error = '';

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.store.pipe(select(selectInvoiceById(id))).subscribe((invoice) => {
        this.invoice = invoice;
      });
    }
    if (!this.invoice) {
      this.store.dispatch(
        InvoiceActions.loadInvoicesFailure({ error: 'Invoice not found' })
      );
      this.router.navigate(['/']);
    }
  }
}
