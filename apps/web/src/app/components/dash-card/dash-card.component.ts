import { Component } from '@angular/core'
import { CopyIconComponent } from '../../assets/icons/copy-icon/copy-icon.component'
import { SettingIconComponent } from '../../assets/icons/setting-icon/setting-icon.component'
import { TrashIconComponent } from '../../assets/icons/trash-icon/trash-icon.component'
import { CheckIconComponent } from '../../assets/icons/check-icon/check-icon.component'

@Component({
    selector: 'app-dash-card',
    imports: [CopyIconComponent, SettingIconComponent, TrashIconComponent],
    templateUrl: './dash-card.component.html'
})
export class DashCardComponent {}
