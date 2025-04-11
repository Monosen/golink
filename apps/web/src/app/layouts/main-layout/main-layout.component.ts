import {
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    Inject,
    OnDestroy,
    OnInit
} from '@angular/core'
import { NavbarComponent } from '../../components/navbar/navbar.component'
import { FooterComponent } from '../../components/footer/footer.component'
import { SubNavbarComponent } from '../../components/sub-navbar/sub-navbar.component'
import { filter, Subscription } from 'rxjs'
import { NavigationEnd, Router } from '@angular/router'
import { ModalService } from '../../services/modal.service'
import { CreateNewLinkComponent } from '../../components/modals/create-new-link/create-new-link.component'

@Component({
    selector: 'app-main-layout',
    imports: [
        NavbarComponent,
        FooterComponent,
        SubNavbarComponent,
        CreateNewLinkComponent
    ],
    templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent implements OnInit, OnDestroy {
    showSubNavbar: boolean = false
    routerSubscription: Subscription | undefined
    showModal: boolean = false

    constructor(
        private router: Router,
        private modalService: ModalService
    ) {
        this.modalService.modalState$.subscribe((state: boolean) => {
            this.showModal = state
        })
    }

    ngOnInit(): void {
        this.routerSubscription = this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe((event: any) => {
                this.checkRoute(event.url)
            })

        // Check the initial route when the component loads
        this.checkRoute(this.router.url)
    }

    ngOnDestroy(): void {
        if (this.routerSubscription) {
            this.routerSubscription?.unsubscribe()
        }
    }

    checkRoute(url: string): void {
        this.showSubNavbar = url.startsWith('/dash')
    }
}
