import { createReducer, on } from '@ngrx/store';
import * as InvoiceActions from './invoice.actions';
import { InvoiceState } from '../../model/types.model';

export const initialState: InvoiceState = {
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
  })),
  on(InvoiceActions.addInvoice, (state, { invoice }) => ({
    ...state,
    invoices: [...state.invoices, invoice],
  })),
  on(InvoiceActions.deleteInvoice, (state, { id }) => ({
    ...state,
    invoices: state.invoices.filter((invoice) => invoice.id !== id),
  })),
  on(InvoiceActions.markAsPaid, (state, { id }) => ({
    ...state,
    invoices: state.invoices.map((invoice) =>
      invoice.id === id ? { ...invoice, status: 'paid' } : invoice
    ),
  }))
);
