import { Component, Input, Inject } from '@angular/core'
import { DOCUMENT } from '@angular/common'
import { CopyIconComponent } from '../../assets/icons/copy-icon/copy-icon.component'
import { SettingIconComponent } from '../../assets/icons/setting-icon/setting-icon.component'
import { TrashIconComponent } from '../../assets/icons/trash-icon/trash-icon.component'
import { ShortLinkService } from '../../services/short-link.service'
import { CheckIconComponent } from '../../assets/icons/check-icon/check-icon.component'

@Component({
    selector: 'app-short-url-card',
    imports: [
        CopyIconComponent,
        SettingIconComponent,
        TrashIconComponent,
        CheckIconComponent
    ],
    templateUrl: './short-url-card.component.html'
})
export class ShortUrlCardComponent {
    @Input() id: number = 0
    @Input() shortCode: string = ''
    @Input() clicks: number = 0
    @Input() fullUrl: string = ''
    @Input() date: string = ''
    @Input() clickLimit: number | null = null

    isCopied: boolean = false // Nueva propiedad para rastrear el estado del ícono
    baseUrl: string = '' // Propiedad para almacenar la URL base

    constructor(
        private readonly shortLinkService: ShortLinkService,
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
            error: (error) => {
                console.error('Error removing short URL:', error)
            }
        })
    }

    getFormattedDate(): string {
        const date = new Date(this.date)
        return date.toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
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
            .catch((error) => {
                console.error('Error copying to clipboard:', error)
            })
    }

    getFullUrl() {
        if (this.fullUrl.length > 35) {
            return this.fullUrl.slice(0, 35) + '...'
        }

        return this.fullUrl
    }
}
