import { Component, Input } from '@angular/core'

@Component({
    selector: 'app-computer-icon',
    imports: [],
    templateUrl: './computer-icon.component.html'
})
export class ComputerIconComponent {
    @Input() color: string = 'currentColor'
    @Input() svgClass: string = 'size-4'
}
