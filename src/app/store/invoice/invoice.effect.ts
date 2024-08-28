import * as InvoiceActions from './invoice.actions';
import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, of, Subscription, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Invoice } from '../../model/types.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { InvoiceService } from '../../service/invoice.service';

@Injectable()
export class InvoiceEffects {
  private subscription: Subscription;
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store
  ) {
    this.subscription = this.actions$.subscribe((action) => {
      if (action.type === InvoiceActions.loadInvoices.type) {
        this.http.get<Invoice[]>('assets/data.json').subscribe({
          next: (invoices) => {
            this.store.dispatch(
              InvoiceActions.loadInvoicesSuccess({ invoices })
            );
          },
          error: (error) => {
            this.store.dispatch(
              InvoiceActions.loadInvoicesFailure({ error: error.message })
            );
          },
        });
      }
    });
  }
}

// //To be used later

// export class InvoiceEffects {
//   constructor(
//     private actions$: Actions,
//     private invoiceService: InvoiceService
//   ) {}

//   loadInvoices$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(InvoiceActions.loadInvoices),
//       tap(() => console.log('loadInvoices action caught in effect')),
//       mergeMap(() =>
//         this.invoiceService.getInvoices().pipe(
//           map((invoices) => {
//             console.log('Invoices fetched successfully:', invoices);
//             return InvoiceActions.loadInvoicesSuccess({ invoices });
//           }),
//           catchError((error) => {
//             console.error('Error fetching invoices:', error);
//             return of(
//               InvoiceActions.loadInvoicesFailure({ error: error.message })
//             );
//           })
//         )
//       )
//     )
//   );
// }
