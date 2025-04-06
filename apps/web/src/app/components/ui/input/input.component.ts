import { Component, Input } from '@angular/core'

@Component({
    selector: 'app-input',
    imports: [],
    templateUrl: './input.component.html'
})
export class InputComponent {
    @Input() placeholder: string = 'text'
    @Input() type: string = 'text'
}
