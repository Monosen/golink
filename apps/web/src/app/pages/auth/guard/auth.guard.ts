import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { AuthService } from '../auth.service'
import { map } from 'rxjs'

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService)
  const router = inject(Router)

  return authService.isAuthenticated().pipe(
    map((isAuthenticated: boolean) => {
      if (isAuthenticated) {
        return true
      } else {
        void router.navigate(['/auth'], {
          queryParams: { mode: 'login' },
        })
        return false
      }
    })
  )
}
