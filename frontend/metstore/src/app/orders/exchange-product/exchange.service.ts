import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
const url = environment.exchangesUrl;
@Injectable({
  providedIn: 'root',
})
export class ExchangeService {
  onProdExchanged = new Subject();
  constructor(private http: HttpClient) {}

  exchangeProducts(
    _oldProductId: number,
    _newProductId: number,
    orderId: number
  ) {
    const exchange = {
      oldProductId: _oldProductId,
      newProductId: _newProductId,
    };
    return this.http.put(url + orderId, exchange).subscribe(() => {
      this.onProdExchanged.next();
    });
  }
}
