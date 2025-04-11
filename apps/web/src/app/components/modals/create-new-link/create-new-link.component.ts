import { Component } from '@angular/core'
import { ShuffleIconComponent } from '../../../assets/icons/shuffle-icon/shuffle-icon.component'
import { ModalService } from '../../../services/modal.service'

@Component({
    selector: 'app-create-new-link',
    imports: [ShuffleIconComponent],
    templateUrl: './create-new-link.component.html'
})
export class CreateNewLinkComponent {
    constructor(private modalService: ModalService) {}

    closeModal(): void {
        this.modalService.closeModal()
    }
}
