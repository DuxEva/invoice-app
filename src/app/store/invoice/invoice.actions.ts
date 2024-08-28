import { createAction } from "@ngrx/store";


export const loadInvoices = createAction("[Invoice] Load Invoices");
export const loadInvoicesSuccess = createAction(
  "[Invoice] Load Invoices Success",
  (invoices: any) => ({ invoices })
);

export const loadInvoicesFailure = createAction(
  "[Invoice] Load Invoices Failure",
  (error: any) => ({ error })
);