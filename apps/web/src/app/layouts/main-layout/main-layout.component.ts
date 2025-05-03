import { Component } from '@angular/core'
import { NavbarComponent } from '../../components/navbar/navbar.component'
import { FooterComponent } from '../../components/footer/footer.component'

import { Subscription } from 'rxjs'

import { CreateLinkService } from '../../services/modals/create-link.service'
import { CreateNewLinkComponent } from '../../components/modals/create-new-link/create-new-link.component'

@Component({
  selector: 'app-main-layout',
  imports: [NavbarComponent, FooterComponent, CreateNewLinkComponent],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {
  showSubNavbar: boolean = false
  routerSubscription: Subscription | undefined
  showCreateLinkModal: boolean = false
  showSettingLinkModal: boolean = false

  constructor(private createLinkService: CreateLinkService) {
    this.createLinkService.modalState$.subscribe((state: boolean) => {
      this.showCreateLinkModal = state
    })
  }
}
