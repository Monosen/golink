import { Component, Input } from '@angular/core'

@Component({
    selector: 'app-shuffle-icon',
    imports: [],
    templateUrl: './shuffle-icon.component.html'
})
export class ShuffleIconComponent {
    @Input() color: string = 'currentColor'
    @Input() svgClass: string = 'size-4'
}
