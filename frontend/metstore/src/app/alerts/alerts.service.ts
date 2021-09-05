import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  constructor() {}
  toasts: any[] = [];
  //Determina se o alerta aparecerá com visual padrão ou visual vermelho para erros
  isDanger = false;

  show(header: string, body: string, _isDanger: boolean) {
    this.isDanger = _isDanger;
    this.toasts.push({ header, body });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter((t) => t != toast);
  }
}
