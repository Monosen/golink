import { Routes } from '@angular/router'
import { HomeComponent } from './pages/home/home.component'
import { DashComponent } from './pages/dash/dash.component'

export const routes: Routes = [
    { path: '', title: 'home', component: HomeComponent },
    { path: 'dash', title: 'dash', component: DashComponent }
]
