import {
  Component,
  ViewContainerRef,
  ComponentRef,
  ViewChild,
  AfterViewInit,
  Input,
  OnDestroy,
  ChangeDetectorRef,
  inject,
} from '@angular/core'
import { ModalService } from '../../../services/modals/modal.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-generic-modal',
  standalone: true,
  imports: [],
  templateUrl: './generic-modal.component.html',
})
export class GenericModalComponent implements AfterViewInit, OnDestroy {
  @Input() title: string = ''
  @Input() showCloseButton: boolean = true
  @Input() modalClass: string = ''
  @Input() overlayClass: string = ''

  @ViewChild('modalContent', { read: ViewContainerRef })
  modalContent!: ViewContainerRef
  private componentRef: ComponentRef<any> | null = null
  private subscription: Subscription | null = null

  private modalService = inject(ModalService)
  private cdr = inject(ChangeDetectorRef)

  ngAfterViewInit() {
    this.subscription = this.modalService.modalState$.subscribe(modalData => {
      if (modalData) {
        if (modalData.data) {
          this.title = modalData.data.title || this.title
          this.showCloseButton =
            modalData.data.showCloseButton ?? this.showCloseButton
          this.modalClass = modalData.data.modalClass || this.modalClass
          this.overlayClass = modalData.data.overlayClass || this.overlayClass
          this.cdr.detectChanges()
        }
        this.loadComponent(modalData)
      } else {
        this.clearComponent()
      }
    })
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  private async loadComponent(modalData: { component: any; data?: any }) {
    this.clearComponent()

    this.componentRef = this.modalContent.createComponent(modalData.component)

    if (modalData.data) {
      Object.assign(this.componentRef.instance, modalData.data)
    }
  }

  private clearComponent() {
    if (this.componentRef) {
      this.componentRef.destroy()
      this.componentRef = null
    }
  }

  closeModal() {
    this.modalService.closeModal()
  }
}
