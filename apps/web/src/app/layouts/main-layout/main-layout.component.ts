import { Component, OnDestroy, OnInit } from '@angular/core'
import { NavbarComponent } from '../../components/navbar/navbar.component'
import { FooterComponent } from '../../components/footer/footer.component'
import { SubNavbarComponent } from '../../components/sub-navbar/sub-navbar.component'
import { filter, Subscription } from 'rxjs'
import { NavigationEnd, Router } from '@angular/router'

@Component({
    selector: 'app-main-layout',
    imports: [NavbarComponent, FooterComponent, SubNavbarComponent],
    templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent implements OnInit, OnDestroy {
    showSubNavbar: boolean = false
    routerSubscription: Subscription | undefined

    constructor(private router: Router) {}

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
