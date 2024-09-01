import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Invoice, InvoiceState } from '../../model/types.model';
import { selectInvoices } from '../../store/invoice/invoice.selector';
import * as InvoiceActions from '../../store/invoice/invoice.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  invoices$!: Observable<Invoice[]>;
  isOpen = false;
  isFilterOpen = false;

  @ViewChild('filterButton') filterButton!: ElementRef;
  @ViewChild('filterDiv') filterDiv!: ElementRef;

  constructor(private store: Store<InvoiceState>, private eRef: ElementRef) {}

  ngOnInit(): void {
    this.store.dispatch(InvoiceActions.loadInvoices());
    this.invoices$ = this.store.pipe(select(selectInvoices));
  }

  onToggleForm() {
    this.isOpen = !this.isOpen;
  }

  onToggleFilter() {
    this.isFilterOpen = !this.isFilterOpen;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (
      this.isFilterOpen &&
      this.filterButton &&
      this.filterDiv &&
      !this.filterButton.nativeElement.contains(event.target) &&
      !this.filterDiv.nativeElement.contains(event.target)
    ) {
      this.isFilterOpen = false;
    }
  }
}
