import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { ShortLinkService } from '../services/short-link.service'
import { map, catchError, of } from 'rxjs'

export const shortUrlGuard: CanActivateFn = (route) => {
    const shortLinkService = inject(ShortLinkService)
    const code = route.paramMap.get('code')

    if (!code) {
        return true
    }

    return shortLinkService.getLongUrl(code).pipe(
        map((response) => {
            window.location.replace(response.longUrl)
            return false
        }),
        catchError((error) => {
            console.error('Error al obtener la URL:', error)
            return of(true)
        })
    )
}
