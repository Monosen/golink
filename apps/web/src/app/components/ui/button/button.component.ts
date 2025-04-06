import { Component, Input } from '@angular/core'

@Component({
    selector: 'app-button',
    imports: [],
    templateUrl: './button.component.html'
})
export class ButtonComponent {
    @Input() name: string = ''
    @Input() type: 'button' | 'submit' = 'button'
}
