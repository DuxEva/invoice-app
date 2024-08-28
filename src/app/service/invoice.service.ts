import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '../model/types.model';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  URL = 'assets/data.json';

  constructor(private http: HttpClient) {}

  getInvoices(): Observable<Invoice[]> {
    console.log('getInvoices', this.http.get<Invoice[]>(this.URL));
    return this.http.get<Invoice[]>(this.URL);
  }
}
