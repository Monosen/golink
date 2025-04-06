import { Component, Input } from '@angular/core'

@Component({
    selector: 'app-trash-icon',
    imports: [],
    templateUrl: './trash-icon.component.html'
})
export class TrashIconComponent {
    @Input() color: string = 'currentColor'
    @Input() svgClass: string = 'size-4'
}
