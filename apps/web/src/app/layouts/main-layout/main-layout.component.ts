import { Component } from '@angular/core'
import { NavbarComponent } from '../../components/navbar/navbar.component'
import { FooterComponent } from '../../components/footer/footer.component'
import { GenericModalComponent } from '../../components/modals/generic-modal/generic-modal.component'

import { map, Subscription } from 'rxjs'
import { ModalData, ModalService } from '../../services/modals/modal.service'

@Component({
  selector: 'app-main-layout',
  imports: [NavbarComponent, FooterComponent, GenericModalComponent],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {
  routerSubscription: Subscription | undefined
  showCreateLinkModal: boolean = false
  showGenericModal: boolean = false

  constructor(private modalService: ModalService) {
    this.modalService.modalState$
      .pipe(map((modalData: ModalData | null) => !!modalData))
      .subscribe((state: boolean) => {
        this.showGenericModal = state
      })
  }
}
