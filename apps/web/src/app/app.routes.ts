import { Routes } from '@angular/router'
import { HomeComponent } from './pages/home/home.component'
import { DashComponent } from './pages/dash/dash.component'
import { AuthComponent } from './pages/auth/auth.component'
import { CallbackComponent } from './pages/auth/callback/callback.component'

import { noAuthGuard } from './guards/auth/no-auth.guard'
import { authGuard } from './guards/auth/auth.guard'
import { SettingsComponent } from './pages/dash/settings/settings.component'

export const routes: Routes = [
    {
        path: '',
        title: 'home',
        component: HomeComponent,
        canActivate: [noAuthGuard]
    },
    {
        path: 'dash',
        title: 'dash',
        canActivate: [authGuard],
        children: [
            { path: '', component: DashComponent },
            {
                path: 'settings',
                title: 'settings',
                component: SettingsComponent
            }
        ]
    },
    {
        path: 'auth',
        title: 'auth',
        children: [
            {
                path: '',
                component: AuthComponent,
                canActivate: [noAuthGuard]
            },
            {
                path: 'callback',
                title: 'auth-callback',
                component: CallbackComponent
            }
        ]
    }
]
