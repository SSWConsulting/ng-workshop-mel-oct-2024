import { Injectable } from '@angular/core';

export interface ToastInfo {
  body: string;
  mode?: 'success' | 'danger';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: ToastInfo[] = [];

  showError(body: string): void {
    this.toasts.push({ body, mode: 'danger' });
  }

  showSuccess(body: string): void {
    this.toasts.push({ body, mode: 'success' });
  }

  remove(toast: ToastInfo): void {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
