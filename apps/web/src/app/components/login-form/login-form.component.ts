import { Component } from '@angular/core'
import { InputComponent } from '../ui/input/input.component'
import { ButtonComponent } from '../ui/button/button.component'
import { AuthService } from '../../pages/auth/auth.service'
import {
    FormGroup,
    Validators,
    ReactiveFormsModule,
    FormControl
} from '@angular/forms'
import { Router } from '@angular/router'
import { CommonModule } from '@angular/common'

@Component({
    selector: 'app-login-form',
    imports: [
        InputComponent,
        ButtonComponent,
        ReactiveFormsModule,
        CommonModule
    ],
    templateUrl: './login-form.component.html',
    standalone: true
})
export class LoginFormComponent {
    email: FormControl
    password: FormControl

    loginForm: FormGroup
    errorMessage: string = ''
    isLoading: boolean = false

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
        this.email = new FormControl('', [
            Validators.required,
            Validators.email
        ])
        this.password = new FormControl('', [
            Validators.required,
            Validators.minLength(6)
        ])

        this.loginForm = new FormGroup({
            email: this.email,
            password: this.password
        })
    }

    onSubmit() {
        // Verifica si el formulario es válido antes de proceder
        if (this.loginForm.invalid) {
            console.log('El formulario es inválido. No se puede enviar.')
            return // Detiene la ejecución de la función onSubmit
        }

        this.isLoading = true
        this.errorMessage = ''

        console.log(this.loginForm.value)

        this.authService.login(this.loginForm.value).subscribe({
            next: () => {
                this.isLoading = false
                // Navigate to home or dashboard after successful login
                this.router.navigate(['/dash'])
            },
            error: (error) => {
                this.isLoading = false
                this.errorMessage =
                    error.error?.message || 'Login failed. Please try again.'
            }
        })
    }
}
