import { Component, Input } from '@angular/core'

@Component({
    selector: 'app-login-icon',
    imports: [],
    templateUrl: './login-icon.component.html'
})
export class LoginIconComponent {
    @Input() color: string = 'currentColor'
    @Input() svgClass: string = 'size-4'
}
