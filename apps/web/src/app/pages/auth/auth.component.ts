import { Component, OnInit } from '@angular/core'
import { LoginFormComponent } from '../../components/login-form/login-form.component'
import { RegisterFormComponent } from '../../components/register-form/register-form.component'
import { ActivatedRoute } from '@angular/router'
import { GithubIconComponent } from '../../assets/icons/github-icon/github-icon.component'
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc'

@Component({
    selector: 'app-auth',
    imports: [LoginFormComponent, RegisterFormComponent, GithubIconComponent],
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
    mode: string = 'login' // 'login' o 'register'

    constructor(
        private oauthService: OAuthService,
        private authConfig: AuthConfig,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.oauthService.configure(this.authConfig)
        this.route.queryParams.subscribe((params) => {
            this.mode = this.validateMode(params['mode'])
        })
    }

    onModeChange(mode: string) {
        this.mode = this.validateMode(mode)
    }

    private validateMode(mode: string): 'login' | 'register' {
        return mode === 'login' || mode === 'register' ? mode : 'login'
    }

    loginWithGithub(): void {
        this.oauthService.initLoginFlow()
    }
}
