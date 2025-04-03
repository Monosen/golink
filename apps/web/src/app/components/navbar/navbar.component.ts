import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { LoginIconComponent } from '../../assets/icons/login-icon/login-icon.component'
import { RegisterIconComponent } from '../../assets/icons/register-icon/register-icon.component'

@Component({
    selector: 'app-navbar',
    imports: [RouterLink, LoginIconComponent, RegisterIconComponent],
    templateUrl: './navbar.component.html'
})
export class NavbarComponent {}
