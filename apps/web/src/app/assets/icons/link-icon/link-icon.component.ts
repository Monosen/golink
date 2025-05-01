import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-link-icon',
  imports: [],
  templateUrl: './link-icon.component.html',
})
export class LinkIconComponent {
  @Input() color: string = 'currentColor'
  @Input() svgClass: string = 'size-4'
}
