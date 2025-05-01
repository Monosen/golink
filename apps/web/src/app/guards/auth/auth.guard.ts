import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { map } from 'rxjs'

import { AuthService } from '../../pages/auth/auth.service'

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService)
  const router = inject(Router)

  return authService.isAuthenticated().pipe(
    map((isAuthenticated: boolean) => {
      if (isAuthenticated) {
        return true
      } else {
        router.navigate(['/auth'], {
          queryParams: { mode: 'login' },
        })
        return false
      }
    })
  )
}
