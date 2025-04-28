import { Component } from '@angular/core'

import { CreateLinkService } from '../../../services/modals/create-link.service'

import { NewLinkFormComponent } from '../../new-link-form/new-link-form.component'

@Component({
    selector: 'app-create-new-link',
    standalone: true,
    imports: [NewLinkFormComponent],
    templateUrl: './create-new-link.component.html'
})
export class CreateNewLinkComponent {
    constructor(private createLinkService: CreateLinkService) {}

    closeModal(): void {
        this.createLinkService.closeModal()
    }
}
