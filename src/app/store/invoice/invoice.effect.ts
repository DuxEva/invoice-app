import * as InvoiceActions from './invoice.actions';
import { inject, Injectable } from '@angular/core';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { InvoiceService } from '../../service/invoice.service';

@Injectable()
export class InvoiceEffects {
  constructor(private invoiceService: InvoiceService) {}

  private actions$ = inject(Actions);

  loadInvoices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActions.loadInvoices),
      mergeMap(() =>
        this.invoiceService.getInvoices().pipe(
          map((invoices) => {
            return InvoiceActions.loadInvoicesSuccess({ invoices });
          }),
          catchError((error) => {
            return of(
              InvoiceActions.loadInvoicesFailure({ error: error.message })
            );
          })
        )
      )
    )
  );
}
