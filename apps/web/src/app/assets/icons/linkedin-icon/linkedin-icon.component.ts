import { Component, Input } from '@angular/core'

@Component({
    selector: 'app-linkedin-icon',
    imports: [],
    templateUrl: './linkedin-icon.component.html'
})
export class LinkedinIconComponent {
    @Input() color: string = 'currentColor'
    @Input() svgClass: string = 'size-4'
}
