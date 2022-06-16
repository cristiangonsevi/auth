import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { SweetAlertPosition, SweetAlertOptions } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SweetAlertService {
  constructor() {}

  toast(options: SweetAlertOptions, position?: SweetAlertPosition) {
    const toast = Swal.mixin({
      toast: true,
      position: position || 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
    return toast.fire(options);
  }
}
