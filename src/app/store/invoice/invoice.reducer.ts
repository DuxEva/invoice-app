import { createReducer, on } from '@ngrx/store';

import * as InvoiceActions from './invoice.actions';

export const initialState = {
  invoices: [],
  error: null,
};

export const invoiceReducer = createReducer(
  initialState,
  on(InvoiceActions.loadInvoices, (state) => ({
    ...state,
  })),
  on(InvoiceActions.loadInvoicesSuccess, (state, { invoices }) => ({
    ...state,
    invoices,
  })),
  on(InvoiceActions.loadInvoicesFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
