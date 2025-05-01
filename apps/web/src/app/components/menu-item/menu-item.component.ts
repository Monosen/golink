import { Component, Input } from '@angular/core'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  imports: [RouterModule],
})
export class MenuItemComponent {
  @Input() label: string = ''
  @Input() href?: string
  @Input() target?: string
  @Input() routerLink?: string
}
