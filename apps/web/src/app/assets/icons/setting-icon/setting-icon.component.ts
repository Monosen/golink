import { Component, Input } from '@angular/core'

@Component({
    selector: 'app-setting-icon',
    imports: [],
    templateUrl: './setting-icon.component.html'
})
export class SettingIconComponent {
    @Input() color: string = 'currentColor'
    @Input() svgClass: string = 'size-4'
}
