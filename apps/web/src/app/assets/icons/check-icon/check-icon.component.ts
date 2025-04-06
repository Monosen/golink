import { Component, Input } from '@angular/core'

@Component({
    selector: 'app-check-icon',
    imports: [],
    templateUrl: './check-icon.component.html'
})
export class CheckIconComponent {
    @Input() color: string = 'currentColor'
    @Input() svgClass: string = 'size-4'
}
