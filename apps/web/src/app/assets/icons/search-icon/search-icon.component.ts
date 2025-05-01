import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-search-icon',
  imports: [],
  templateUrl: './search-icon.component.html',
})
export class SearchIconComponent {
  @Input() color: string = 'currentColor'
  @Input() svgClass: string = 'size-4'
}
