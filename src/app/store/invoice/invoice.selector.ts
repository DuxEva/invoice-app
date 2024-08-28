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
