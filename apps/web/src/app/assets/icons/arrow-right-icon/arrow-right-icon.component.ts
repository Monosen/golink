import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-arrow-right-icon',
  imports: [],
  templateUrl: './arrow-right-icon.component.html',
})
export class ArrowRightIconComponent {
  @Input() color: string = 'currentColor'
  @Input() svgClass: string = 'size-4'
}
