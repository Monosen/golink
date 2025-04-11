import { Component } from '@angular/core'
import { UserIconComponent } from '../../assets/icons/user-icon/user-icon.component'
import { SettingIconComponent } from '../../assets/icons/setting-icon/setting-icon.component'

@Component({
    selector: 'app-user-dropdown',
    imports: [UserIconComponent, SettingIconComponent],
    templateUrl: './user-dropdown.component.html'
})
export class UserDropdownComponent {
    showDropdown = false

    toggleDropdown() {
        this.showDropdown = !this.showDropdown
    }
}
