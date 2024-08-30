import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Invoice } from '../../model/types.model';

export const selectInvoiceState = createFeatureSelector<{
  invoices: {
    invoices: Invoice[];
    error: any;
  };
}>('invoice');

export const selectInvoices = createSelector(
  selectInvoiceState,
  (state) => state.invoices.invoices
);

export const selectInvoiceById = (id: string) =>
  createSelector(selectInvoices, (invoices) =>
    invoices.find((invoice) => invoice.id === id)
  );

export const selectError = createSelector(
  selectInvoiceState,
  (state) => state.invoices.error
);
