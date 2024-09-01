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
import {
  selectInvoices,
  selectInvoiceByStatus,
} from '../../store/invoice/invoice.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  invoices$!: Observable<Invoice[]>;
  isOpen = false;
  isFilterOpen = false;
  selectedFilters: string[] = [];

  @ViewChild('filterButton') filterButton!: ElementRef;
  @ViewChild('filterDiv') filterDiv!: ElementRef;

  constructor(private store: Store<InvoiceState>, private eRef: ElementRef) {}

  ngOnInit(): void {
    this.invoices$ = this.store.pipe(select(selectInvoices));
  }

  onToggleForm() {
    this.isOpen = !this.isOpen;
  }

  onToggleFilter() {
    this.isFilterOpen = !this.isFilterOpen;
  }

  onFilterChange(status: string, event: any) {
    const checked = event.target.checked;
    if (checked) {
      this.selectedFilters.push(status);
    } else {
      this.selectedFilters = this.selectedFilters.filter((s) => s !== status);
    }
    this.filterInvoices();
  }

  filterInvoices() {
    if (this.selectedFilters.length > 0) {
      this.invoices$ = this.store.pipe(
        select(selectInvoiceByStatus(this.selectedFilters))
      );
    } else {
      this.invoices$ = this.store.pipe(select(selectInvoices));
    }
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
