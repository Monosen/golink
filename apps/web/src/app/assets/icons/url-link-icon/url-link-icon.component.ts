import { Component, Input } from '@angular/core'

@Component({
    selector: 'app-url-link-icon',
    imports: [],
    templateUrl: './url-link-icon.component.html'
})
export class UrlLinkIconComponent {
    @Input() color: string = 'currentColor'
    @Input() svgClass: string = 'size-4'
}
