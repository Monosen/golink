import { Component, Input } from '@angular/core'

@Component({
    selector: 'app-sun-icon',
    imports: [],
    templateUrl: './sun-icon.component.html'
})
export class SunIconComponent {
    @Input() color: string = 'currentColor'
    @Input() svgClass: string = 'size-4'
}
