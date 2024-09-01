import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Invoice, InvoiceState } from '../../model/types.model';

export const selectInvoiceState = createFeatureSelector<{
  invoices: Invoice[];
  error: string | null;
}>('invoice');

export const selectInvoices = createSelector(selectInvoiceState, (state) => {
  selectInvoiceState;
  return state.invoices;
});

export const selectInvoiceById = (id: string) =>
  createSelector(selectInvoices, (invoices) =>
    invoices.find((invoice) => invoice.id === id)
  );

export const selectInvoiceByStatus = (status: string[]) =>
  createSelector(selectInvoices, (invoices) =>
    invoices.filter((invoice) => status.includes(invoice.status))
  );

export const selectError = createSelector(
  selectInvoiceState,
  (state) => state.error
);

export const selectLastAddedInvoice = createSelector(
  selectInvoices,
  (invoices) => invoices[invoices.length - 1]
);
