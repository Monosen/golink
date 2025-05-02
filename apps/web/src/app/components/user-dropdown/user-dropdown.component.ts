import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { AuthService } from '../../pages/auth/auth.service'
import { MenuItemComponent } from '../menu-item/menu-item.component'

@Component({
  selector: 'app-user-dropdown',
  imports: [RouterLink, MenuItemComponent],
  templateUrl: './user-dropdown.component.html',
})
export class UserDropdownComponent {
  showDropdown = false

  constructor(public readonly authService: AuthService) {}

  toggleDropdown() {
    this.showDropdown = !this.showDropdown
  }
}
