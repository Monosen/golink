import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../auth.service'
import { MainLayoutComponent } from '../../../layouts/main-layout/main-layout.component'

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  imports: [MainLayoutComponent],
})
export class CallbackComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Procesar el callback de GitHub
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code') // Obtener el código de autorización de la URL

    if (code) {
      this.authService.exchangeCodeForToken(code).subscribe({
        next: () => {
          // Redirigir al dashboard después de iniciar sesión
          void this.router.navigate(['/dash'])
        },
        error: err => {
          console.error('Error durante el intercambio de código:', err)
          void this.router.navigate(['/auth'], {
            queryParams: { mode: 'login' },
          }) // Redirigir a la página de login en caso de error
        },
      })
    } else {
      console.error('No se encontró el código de autorización en la URL')
      void this.router.navigate(['/auth'], {
        queryParams: { mode: 'register' },
      })
    }
  }
}
