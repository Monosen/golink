import { Component } from '@angular/core'

@Component({
    selector: 'app-redirect',
    template: `
        <div class="flex items-center justify-center min-h-screen">
            <div class="text-center">
                <h1 class="text-2xl font-bold mb-4">Redirigiendo...</h1>
                <p class="text-gray-600">Por favor, espera un momento mientras te redirigimos a tu destino.</p>
            </div>
        </div>
    `
})
export class RedirectComponent {}
