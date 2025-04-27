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
import { CreateLinkService } from '../../services/modals/create-link.service'
import { CreateNewLinkComponent } from '../../components/modals/create-new-link/create-new-link.component'
import { SettingLinkService } from '../../services/modals/setting-link.service'

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
    showCreateLinkModal: boolean = false
    showSettingLinkModal: boolean = false

    constructor(
        private router: Router,
        private createLinkService: CreateLinkService,
        private settingLinkService: SettingLinkService
    ) {
        this.createLinkService.modalState$.subscribe((state: boolean) => {
            this.showCreateLinkModal = state
        })
        this.settingLinkService.modalState$.subscribe((state: boolean) => {
            this.showSettingLinkModal = state
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
