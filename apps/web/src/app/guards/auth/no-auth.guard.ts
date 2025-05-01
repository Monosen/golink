import { CanActivateFn, Router } from '@angular/router'
import { inject } from '@angular/core'
import { map } from 'rxjs/operators'

import { AuthService } from '../../pages/auth/auth.service'

export const noAuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService)
  const router = inject(Router)

  return authService.isAuthenticated().pipe(
    map((isAuthenticated: boolean) => {
      if (isAuthenticated) {
        // Si está autenticado, redirige a la página principal
        return router.createUrlTree(['/dash'])
      } else {
        // Si no está autenticado, permite el acceso a /auth
        return true
      }
    })
  )
}
