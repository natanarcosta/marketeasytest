import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AlertsService } from 'src/app/alerts/alerts.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
const url = environment.exchangesUrl;
@Injectable({
  providedIn: 'root',
})
export class ExchangeService {
  onProdExchanged = new Subject();
  constructor(private http: HttpClient, private alertService: AlertsService) {}

  exchangeProducts(
    _oldProductId: number,
    _newProductId: number,
    orderId: number
  ) {
    //Objeto com os parametros que a rota /exchanges precisa para trocar produtos
    const exchange = {
      oldProductId: _oldProductId,
      newProductId: _newProductId,
    };
    return this.http.put(url + orderId, exchange).subscribe(
      () => {
        this.alertService.show(
          `Pedido nº ${orderId}`,
          'Produtos trocados e valor do pedido atualizado!',
          false
        );
        this.onProdExchanged.next();
      },
      (error) => {
        if (error.status == 404) {
          Swal.fire({
            title: 'Erro',
            text: 'Um dos IDs informados é inválido!',
          });
        }
      }
    );
  }
}
