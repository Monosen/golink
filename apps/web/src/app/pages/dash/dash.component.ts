import { Component } from '@angular/core'
import { DashCardComponent } from '../../components/dash-card/dash-card.component'
import { SubNavbarComponent } from '../../components/sub-navbar/sub-navbar.component'
import { LinkComponent } from '../../components/ui/link/link.component'
import { LinkManagementBarComponent } from '../../components/link-management-bar/link-management-bar.component'

@Component({
    selector: 'app-dash',
    imports: [DashCardComponent, LinkManagementBarComponent],
    templateUrl: './dash.component.html'
})
export class DashComponent {}
