import { Component } from '@angular/core'
import { ArrowRightIconComponent } from '../../assets/icons/arrow-right-icon/arrow-right-icon.component'
import { GithubIconComponent } from '../../assets/icons/github-icon/github-icon.component'
import { UrlLinkIconComponent } from '../../assets/icons/url-link-icon/url-link-icon.component'

@Component({
    selector: 'app-home',
    imports: [GithubIconComponent, UrlLinkIconComponent],
    templateUrl: './home.component.html'
})
export class HomeComponent {}
