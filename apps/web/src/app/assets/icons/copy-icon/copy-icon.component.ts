import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-copy-icon',
  imports: [],
  templateUrl: './copy-icon.component.html',
})
export class CopyIconComponent {
  @Input() color: string = 'currentColor'
  @Input() svgClass: string = 'size-4'
}
