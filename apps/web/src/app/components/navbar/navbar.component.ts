import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { LinkComponent } from '../ui/link/link.component'
import { AuthService } from '../../pages/auth/auth.service'
import { UserDropdownComponent } from '../user-dropdown/user-dropdown.component'

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, LinkComponent, UserDropdownComponent],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  constructor(public readonly authService: AuthService) {
    // Initialize any necessary properties or services here
  }
}
