import { Component, OnInit } from '@angular/core'
import { ShortLinkService, ShortUrl } from '../../services/short-link.service'
import { ShortUrlCardComponent } from '../../components/short-url-card/short-url-card.component'
import { LinkManagementBarComponent } from '../../components/link-management-bar/link-management-bar.component'

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  imports: [ShortUrlCardComponent, LinkManagementBarComponent],
})
export class DashComponent implements OnInit {
  shortUrls: ShortUrl[] = []

  constructor(private shortLinkService: ShortLinkService) {}

  ngOnInit(): void {
    // Suscribirse al observable para obtener los datos
    this.shortLinkService.shortUrls$.subscribe(shortUrls => {
      this.shortUrls = shortUrls
    })

    // Cargar las URLs cortas al inicializar
    this.shortLinkService.getAllShortUrls().subscribe()
  }
}
