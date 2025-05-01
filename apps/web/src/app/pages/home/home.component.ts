import { Component } from '@angular/core'
import { GithubIconComponent } from '../../assets/icons/github-icon/github-icon.component'
import { UrlLinkIconComponent } from '../../assets/icons/url-link-icon/url-link-icon.component'
import { LinkComponent } from '../../components/ui/link/link.component'

@Component({
  selector: 'app-home',
  imports: [GithubIconComponent, UrlLinkIconComponent, LinkComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
