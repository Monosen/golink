import { Component, Input } from '@angular/core'
import { CopyIconComponent } from '../../assets/icons/copy-icon/copy-icon.component'
import { SettingIconComponent } from '../../assets/icons/setting-icon/setting-icon.component'
import { TrashIconComponent } from '../../assets/icons/trash-icon/trash-icon.component'
import { ShortLinkService } from '../../services/short-link.service'

@Component({
    selector: 'app-short-url-card',
    imports: [CopyIconComponent, SettingIconComponent, TrashIconComponent],
    templateUrl: './short-url-card.component.html'
})
export class ShortUrlCardComponent {
    @Input() id: number = 0
    @Input() shortCode: string = ''
    @Input() clicks: number = 0
    @Input() fullUrl: string = ''
    @Input() date: string = ''

    constructor(private readonly shortLinkService: ShortLinkService) {}

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
}
