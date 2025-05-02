import { Component } from '@angular/core'
import { InputComponent } from '../../../components/ui/input/input.component'
import { ButtonComponent } from '../../../components/ui/button/button.component'
import { MainLayoutComponent } from '../../../layouts/main-layout/main-layout.component'
import { SubNavbarComponent } from '../../../components/sub-navbar/sub-navbar.component'

@Component({
  selector: 'app-settings',
  imports: [
    InputComponent,
    ButtonComponent,
    MainLayoutComponent,
    SubNavbarComponent,
  ],
  templateUrl: './settings.component.html',
})
export class SettingsComponent {}
