import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-heart-icon',
  imports: [],
  templateUrl: './heart-icon.component.html',
})
export class HeartIconComponent {
  @Input() color: string = 'currentColor'
  @Input() svgClass: string = 'size-4'
}
