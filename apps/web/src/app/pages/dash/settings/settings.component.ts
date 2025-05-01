import { Component } from '@angular/core'
import { InputComponent } from '../../../components/ui/input/input.component'
import { ButtonComponent } from '../../../components/ui/button/button.component'

@Component({
  selector: 'app-settings',
  imports: [InputComponent, ButtonComponent],
  templateUrl: './settings.component.html',
})
export class SettingsComponent {}
