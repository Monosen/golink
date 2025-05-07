import { Component, Input, Inject } from '@angular/core'
import { DOCUMENT } from '@angular/common'
import { ShortLinkService } from '../../services/short-link.service'
import { ModalService } from '../../services/modals/modal.service'
import { DateInfoModalComponent } from '../modals/date-info-modal/date-info-modal.component'
import { DeleteConfirmationModalComponent } from '../modals/delete-confirmation-modal/delete-confirmation-modal.component'
import { NewLinkFormComponent } from '../modals/new-link-form/new-link-form.component'

@Component({
  selector: 'app-short-url-card',
  imports: [],
  templateUrl: './short-url-card.component.html',
})
export class ShortUrlCardComponent {
  @Input() id: number = 0
  @Input() shortCode: string = ''
  @Input() clicks: number = 0
  @Input() fullUrl: string = ''
  @Input() createdAt: Date | null = null
  @Input() clickLimit: number | null = null
  @Input() startDate: Date | null = null
  @Input() endDate: Date | null = null

  isCopied: boolean = false // Nueva propiedad para rastrear el estado del ícono
  baseUrl: string = '' // Propiedad para almacenar la URL base

  constructor(
    private readonly shortLinkService: ShortLinkService,
    private readonly modalService: ModalService,
    @Inject(DOCUMENT) private document: Document // Inyecta el objeto DOCUMENT
  ) {
    this.baseUrl = this.document.location.origin // Obtén la URL base
  }

  removeShortUrl() {
    this.shortLinkService.deleteShortUrl(this.id).subscribe({
      next: () => {
        console.log('Short URL removed successfully')
        this.shortLinkService.getAllShortUrls().subscribe()
      },
      error: error => {
        console.error('Error removing short URL:', error)
      },
    })
  }

  getFormattedDate(date: Date | null): string {
    if (!date) {
      return ''
    }

    const newDate = new Date(date)
    return newDate.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }

  getFormattedTime(date: Date | null): string {
    if (!date) {
      return ''
    }

    const newDate = new Date(date)
    return newDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  copyToClipboard() {
    navigator.clipboard
      .writeText(this.baseUrl + '/' + this.shortCode) // Copia la URL completa
      .then(() => {
        this.isCopied = true // Cambia al ícono de check
        setTimeout(() => {
          this.isCopied = false // Vuelve al ícono de copy después de 2 segundos
        }, 2000)
      })
      .catch(error => {
        console.error('Error copying to clipboard:', error)
      })
  }

  getFullUrl() {
    if (this.fullUrl.length > 35) {
      return this.fullUrl.slice(0, 35) + '...'
    }

    return this.fullUrl
  }

  openDateModal() {
    const modalData = {
      startDate: this.startDate,
      endDate: this.endDate,
      title: 'Fechas del enlace',
    }

    this.modalService.openModal(DateInfoModalComponent, modalData)
  }

  openDeleteModal() {
    const modalData = {
      title: 'Delete Short URL',
      message: 'Are you sure you want to delete this item?',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      onConfirm: () => {
        this.removeShortUrl()
        this.modalService.closeModal()
      },
      onCancel: () => {
        this.modalService.closeModal()
      },
    }

    this.modalService.openModal(DeleteConfirmationModalComponent, modalData)
  }

  openSettingModal() {
    const fullUrl = this.fullUrl

    const modalData = {
      title: 'Editar Enlace',
      isEditMode: true,
      id: this.id,
      initialData: {
        longUrl: fullUrl,
        shortCode: this.shortCode,
        startDate: this.startDate,
        endDate: this.endDate,
        clickLimit: this.clickLimit,
      },
    }

    this.modalService.openModal(NewLinkFormComponent, modalData)
  }
}
