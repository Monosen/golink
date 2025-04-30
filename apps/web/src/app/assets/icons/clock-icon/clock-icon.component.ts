import { Component, Input } from '@angular/core'

@Component({
    selector: 'app-clock-icon',
    imports: [],
    templateUrl: './clock-icon.component.html'
})
export class ClockIconComponent {
    @Input() color: string = 'currentColor'
    @Input() svgClass: string = 'size-4'
}
