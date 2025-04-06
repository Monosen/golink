import { Component } from '@angular/core'
import { NavbarComponent } from '../../components/navbar/navbar.component'
import { FooterComponent } from '../../components/footer/footer.component'

@Component({
    selector: 'app-main-layout',
    imports: [NavbarComponent, FooterComponent],
    templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent {}
