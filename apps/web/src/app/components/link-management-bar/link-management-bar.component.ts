import { Component } from '@angular/core'
import { CreateNewLinkComponent } from '../modals/create-new-link/create-new-link.component'
import { SearchIconComponent } from '../../assets/icons/search-icon/search-icon.component'

@Component({
    selector: 'app-link-management-bar',
    imports: [CreateNewLinkComponent, SearchIconComponent],
    templateUrl: './link-management-bar.component.html'
})
export class LinkManagementBarComponent {
    showCreateLinkModal = false

    toggleCreateLinkModal() {
        this.showCreateLinkModal = !this.showCreateLinkModal
    }
}
