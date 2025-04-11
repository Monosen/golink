import { Component, Input } from '@angular/core'

@Component({
    selector: 'app-hourglass-icon',
    imports: [],
    templateUrl: './hourglass-icon.component.html'
})
export class HourglassIconComponent {
    @Input() color: string = 'currentColor'
    @Input() svgClass: string = 'size-4'
}
