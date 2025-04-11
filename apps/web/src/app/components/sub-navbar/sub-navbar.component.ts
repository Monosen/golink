import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { SettingIconComponent } from '../../assets/icons/setting-icon/setting-icon.component'
import { LinkIconComponent } from '../../assets/icons/link-icon/link-icon.component'

@Component({
    selector: 'app-sub-navbar',
    imports: [RouterLink, SettingIconComponent, LinkIconComponent],
    templateUrl: './sub-navbar.component.html'
})
export class SubNavbarComponent {}
