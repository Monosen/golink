import { Component, OnInit } from '@angular/core'
import { CreateLinkService } from '../../services/modals/create-link.service'
import { SearchIconComponent } from '../../assets/icons/search-icon/search-icon.component'
import { ShortLinkService } from '../../services/short-link.service'

@Component({
  selector: 'app-link-management-bar',
  templateUrl: './link-management-bar.component.html',
  imports: [SearchIconComponent],
})
export class LinkManagementBarComponent implements OnInit {
  shortLinkCount: number | string = 0

  constructor(
    private createLinkService: CreateLinkService,
    private readonly shortLinkService: ShortLinkService
  ) {}

  ngOnInit() {
    this.shortLinkService.getAllShortUrls().subscribe(shortLinks => {
      this.shortLinkCount =
        shortLinks.length <= 9 ? `0${shortLinks.length}` : shortLinks.length
    })
  }

  openModal() {
    this.createLinkService.openModal() // Llama al servicio para abrir el modal
  }
}
