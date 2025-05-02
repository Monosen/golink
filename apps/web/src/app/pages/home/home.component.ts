import { Component } from '@angular/core'
import { LinkComponent } from '../../components/ui/link/link.component'
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout.component'

@Component({
  selector: 'app-home',
  imports: [LinkComponent, MainLayoutComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
