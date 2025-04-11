import { Component, Input } from '@angular/core'

@Component({
    selector: 'app-moon-icon',
    imports: [],
    templateUrl: './moon-icon.component.html'
})
export class MoonIconComponent {
    @Input() color: string = 'currentColor'
    @Input() svgClass: string = 'size-4'
}
