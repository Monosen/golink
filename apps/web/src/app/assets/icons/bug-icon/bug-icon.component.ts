import { Component, Input } from '@angular/core'

@Component({
    selector: 'app-bug-icon',
    imports: [],
    templateUrl: './bug-icon.component.html'
})
export class BugIconComponent {
    @Input() color: string = 'currentColor'
    @Input() svgClass: string = 'size-4'
}
