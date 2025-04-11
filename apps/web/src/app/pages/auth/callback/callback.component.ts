import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { OAuthService } from 'angular-oauth2-oidc'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { AuthService, GithubUser } from '../auth.service'
import { forkJoin } from 'rxjs'

@Component({
    selector: 'app-callback',
    imports: [],
    templateUrl: './callback.component.html'
})
export class CallbackComponent implements OnInit {
    constructor(
        private oauthService: OAuthService,
        private router: Router,
        private http: HttpClient,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        console.log('Procesando callback de GitHub...')
        this.oauthService
            .tryLogin()
            .then(() => {
                if (this.oauthService.hasValidAccessToken()) {
                    console.log('Login exitoso')
                    this.getUserInfo()
                } else {
                    console.error('Error en el proceso de login')
                    this.router.navigate(['/login'])
                }
            })
            .catch((error) => {
                console.error('Error en el callback:', error)
                this.router.navigate(['/login'])
            })
    }

    private getUserInfo() {
        const headers = new HttpHeaders()
            .set(
                'Authorization',
                'Bearer ' + this.oauthService.getAccessToken()
            )
            .set('Accept', 'application/json')

        // Realizar ambas peticiones en paralelo
        forkJoin({
            user: this.http.get<GithubUser>('https://api.github.com/user', {
                headers
            }),
            emails: this.http.get<
                Array<{ email: string; primary: boolean; verified: boolean }>
            >('https://api.github.com/user/emails', { headers })
        }).subscribe({
            next: async ({ user, emails }) => {
                console.log('Información del usuario de GitHub:', user)
                console.log('Emails del usuario:', emails)

                // Encontrar el email primario verificado
                const primaryEmail = emails.find((e) => e.primary && e.verified)
                if (primaryEmail) {
                    user.email = primaryEmail.email
                }

                try {
                    await this.authService.handleGithubUser(user)
                    this.router.navigate(['/'])
                } catch (error) {
                    console.error('Error al procesar usuario:', error)
                    this.router.navigate(['/login'])
                }
            },
            error: (error) => {
                console.error(
                    'Error al obtener información del usuario:',
                    error
                )
                this.router.navigate(['/login'])
            }
        })
    }
}
