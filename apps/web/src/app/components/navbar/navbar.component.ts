import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { LoginIconComponent } from '../../assets/icons/login-icon/login-icon.component'
import { RegisterIconComponent } from '../../assets/icons/register-icon/register-icon.component'
import { LinkComponent } from '../ui/link/link.component'
import { AuthService } from '../../pages/auth/auth.service'
import { UserIconComponent } from '../../assets/icons/user-icon/user-icon.component'
import { GithubIconComponent } from '../../assets/icons/github-icon/github-icon.component'
import { MoonIconComponent } from '../../assets/icons/moon-icon/moon-icon.component'
import { UserDropdownComponent } from '../user-dropdown/user-dropdown.component'

@Component({
    selector: 'app-navbar',
    imports: [
        RouterLink,
        LoginIconComponent,
        RegisterIconComponent,
        LinkComponent,
        UserIconComponent,
        GithubIconComponent,
        MoonIconComponent,
        UserDropdownComponent
    ],
    templateUrl: './navbar.component.html'
})
export class NavbarComponent {
    constructor(public readonly authService: AuthService) {
        // Initialize any necessary properties or services here
    }
}
