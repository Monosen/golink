import {
    ApplicationConfig,
    importProvidersFrom,
    provideZoneChangeDetection
} from '@angular/core'
import { provideRouter } from '@angular/router'

import { provideHttpClient } from '@angular/common/http'
import { AuthConfig, OAuthModule, OAuthService } from 'angular-oauth2-oidc'

import { routes } from './app.routes'
import { environment } from '../environments/environment'

export const authConfig: AuthConfig = {
    issuer: 'https://github.com',
    clientId: environment.githubClientId,
    redirectUri: 'http://localhost:4200/auth/callback',
    scope: 'user:email read:user',
    responseType: 'code',
    oidc: false,
    skipIssuerCheck: true,
    strictDiscoveryDocumentValidation: false,
    requestAccessToken: true,
    showDebugInformation: true,
    disablePKCE: true,
    loginUrl: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'http://localhost:3000/api/auth/github',
    userinfoEndpoint: 'https://api.github.com/user'
}

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(),
        importProvidersFrom(
            OAuthModule.forRoot({
                resourceServer: {
                    allowedUrls: ['https://api.github.com'],
                    sendAccessToken: true
                }
            })
        ),
        { provide: AuthConfig, useValue: authConfig },
        OAuthService
    ]
}
