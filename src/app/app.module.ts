import { isDevMode, NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './pages/home/home.component';
import { InvoiceCardComponent } from './components/invoice-card/invoice-card.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { invoiceReducer } from './store/invoice/invoice.reducer';
import { InvoiceEffects } from './store/invoice/invoice.effect';
import { HttpClientModule } from '@angular/common/http';
import { InvoiceDetailsComponent } from './pages/invoice-details/invoice-details.component';
import { InvoiceStatusComponent } from './components/invoice-status/invoice-status.component';
import { ButtonComponent } from './components/button/button.component';
import { InvoiceItemCardComponent } from './components/invoice-item-card/invoice-item-card.component';
import { NewInvoiceFormComponent } from './components/new-invoice-form/new-invoice-form.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddItemToInvoiceComponent } from './components/add-item-to-invoice/add-item-to-invoice.component';
import { DeleteInvoiceComponent } from './components/delete-invoice/delete-invoice.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    InvoiceCardComponent,
    InvoiceDetailsComponent,
    InvoiceStatusComponent,
    ButtonComponent,
    InvoiceItemCardComponent,
    NewInvoiceFormComponent,
    ItemListComponent,
    AddItemToInvoiceComponent,
    DeleteInvoiceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    StoreModule.forRoot({ invoice: invoiceReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true, // If set to true, the connection is established within the Angular zone
    }),
    EffectsModule.forRoot([InvoiceEffects]),
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
