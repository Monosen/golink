import { Component, OnInit } from '@angular/core'
import { ShortLinkService } from '../../services/short-link.service'
import { ModalService } from '../../services/modals/modal.service'
import { NewLinkFormComponent } from '../modals/new-link-form/new-link-form.component'

@Component({
  selector: 'app-link-management-bar',
  templateUrl: './link-management-bar.component.html',
  imports: [],
})
export class LinkManagementBarComponent implements OnInit {
  shortLinkCount: number | string = 0

  constructor(
    private readonly shortLinkService: ShortLinkService,
    private readonly modalService: ModalService
  ) {}

  ngOnInit() {
    this.shortLinkService.shortUrls$.subscribe(shortLinks => {
      this.shortLinkCount =
        shortLinks.length <= 9 ? `0${shortLinks.length}` : shortLinks.length
    })

    this.shortLinkService.getAllShortUrls().subscribe()
  }

  openNewLinkModal() {
    const modalData = {
      title: 'Create a new linkk',
    }

    this.modalService.openModal(NewLinkFormComponent, modalData)
  }
}
