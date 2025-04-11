import { Component, Input } from '@angular/core'

@Component({
    selector: 'app-user-icon',
    imports: [],
    templateUrl: './user-icon.component.html'
})
export class UserIconComponent {
    @Input() color: string = 'currentColor'
    @Input() svgClass: string = 'size-4'
}
