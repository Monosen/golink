import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-register-icon',
  imports: [],
  templateUrl: './register-icon.component.html',
})
export class RegisterIconComponent {
  @Input() color: string = 'currentColor'
  @Input() svgClass: string = 'size-4'
}
