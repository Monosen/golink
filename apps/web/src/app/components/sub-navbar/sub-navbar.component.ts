import { Component } from '@angular/core'
import { RouterLink, RouterModule } from '@angular/router'

@Component({
  selector: 'app-sub-navbar',
  imports: [RouterLink, RouterModule],
  templateUrl: './sub-navbar.component.html',
})
export class SubNavbarComponent {}
