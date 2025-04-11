import { Component } from '@angular/core'
import { UserIconComponent } from '../../assets/icons/user-icon/user-icon.component'
import { SettingIconComponent } from '../../assets/icons/setting-icon/setting-icon.component'
import { RouterLink } from '@angular/router'
import { AuthService } from '../../pages/auth/auth.service'
import { LoginIconComponent } from '../../assets/icons/login-icon/login-icon.component'
import { BugIconComponent } from '../../assets/icons/bug-icon/bug-icon.component'
import { MenuItemComponent } from '../menu-item/menu-item.component'

@Component({
    selector: 'app-user-dropdown',
    imports: [
        UserIconComponent,
        SettingIconComponent,
        RouterLink,
        LoginIconComponent,
        BugIconComponent,
        MenuItemComponent
    ],
    templateUrl: './user-dropdown.component.html'
})
export class UserDropdownComponent {
    showDropdown = false

    constructor(public readonly authService: AuthService) {}

    toggleDropdown() {
        this.showDropdown = !this.showDropdown
    }
}
