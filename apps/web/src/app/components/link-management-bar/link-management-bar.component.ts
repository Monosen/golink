import { Component } from '@angular/core'
import { ModalService } from '../../services/modal.service'
import { SearchIconComponent } from '../../assets/icons/search-icon/search-icon.component'

@Component({
    selector: 'app-link-management-bar',
    templateUrl: './link-management-bar.component.html',
    imports: [SearchIconComponent]
})
export class LinkManagementBarComponent {
    constructor(private modalService: ModalService) {}

    openModal() {
        this.modalService.openModal() // Llama al servicio para abrir el modal
    }
}
