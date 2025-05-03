import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

export interface ModalData {
  component: any
  data?: any
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalState = new BehaviorSubject<ModalData | null>(null)
  modalState$ = this.modalState.asObservable()

  openModal(component: any, data?: any) {
    this.modalState.next({ component, data })
  }

  closeModal() {
    this.modalState.next(null)
  }
}
