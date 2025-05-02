import { Routes } from '@angular/router'
import { HomeComponent } from './pages/home/home.component'
import { DashComponent } from './pages/dash/dash.component'
import { AuthComponent } from './pages/auth/auth.component'
import { CallbackComponent } from './pages/auth/callback/callback.component'

import { noAuthGuard } from './guards/auth/no-auth.guard'
import { authGuard } from './guards/auth/auth.guard'
import { SettingsComponent } from './pages/dash/settings/settings.component'
import { shortUrlGuard } from './guards/short-url.guard'
import { RedirectComponent } from './pages/redirect/redirect.component'

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    component: HomeComponent,
  },
  {
    path: 'dash',
    title: 'Dash',
    canActivate: [authGuard],
    children: [
      { path: '', component: DashComponent },
      {
        path: 'settings',
        title: 'Settings',
        component: SettingsComponent,
      },
    ],
  },
  {
    path: 'auth',
    title: 'Auth',
    children: [
      {
        path: '',
        component: AuthComponent,
        canActivate: [noAuthGuard],
      },
      {
        path: 'callback',
        title: 'Auth-Callback',
        component: CallbackComponent,
        canActivate: [noAuthGuard],
      },
    ],
  },
  {
    path: ':code',
    title: 'Redirect',
    component: RedirectComponent,
    canActivate: [shortUrlGuard],
  },
]
