import { Component, Input } from '@angular/core'

@Component({
    selector: 'app-github-icon',
    imports: [],
    templateUrl: './github-icon.component.html'
})
export class GithubIconComponent {
    @Input() color: string = 'currentColor'
    @Input() svgClass: string = 'size-4'
}
