import { Component } from '@angular/core'
import { LinkedinIconComponent } from '../../assets/icons/linkedin-icon/linkedin-icon.component'
import { HeartIconComponent } from '../../assets/icons/heart-icon/heart-icon.component'

@Component({
  selector: 'app-footer',
  imports: [LinkedinIconComponent, HeartIconComponent],
  templateUrl: './footer.component.html',
})
export class FooterComponent {}
