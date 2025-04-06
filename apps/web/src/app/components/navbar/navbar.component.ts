import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { LoginIconComponent } from '../../assets/icons/login-icon/login-icon.component'
import { RegisterIconComponent } from '../../assets/icons/register-icon/register-icon.component'
import { LinkComponent } from '../ui/link/link.component'

@Component({
    selector: 'app-navbar',
    imports: [
        RouterLink,
        LoginIconComponent,
        RegisterIconComponent,
        LinkComponent
    ],
    templateUrl: './navbar.component.html'
})
export class NavbarComponent {}
