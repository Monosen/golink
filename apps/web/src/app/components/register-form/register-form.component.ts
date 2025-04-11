import { Component } from '@angular/core'
import { InputComponent } from '../ui/input/input.component'
import { ButtonComponent } from '../ui/button/button.component'
import { AuthService, RegisterUserDto } from '../../pages/auth/auth.service'
import {
    FormBuilder,
    FormGroup,
    Validators,
    ReactiveFormsModule
} from '@angular/forms'
import { Router } from '@angular/router'
import { CommonModule } from '@angular/common'

@Component({
    selector: 'app-register-form',
    imports: [
        InputComponent,
        ButtonComponent,
        ReactiveFormsModule,
        CommonModule
    ],
    templateUrl: './register-form.component.html',
    standalone: true
})
export class RegisterFormComponent {
    registerForm: FormGroup
    errorMessage: string = ''
    isLoading: boolean = false

    constructor(
        private authService: AuthService,
        private fb: FormBuilder,
        private router: Router
    ) {
        this.registerForm = this.fb.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        })
    }

    onSubmit() {
        if (this.registerForm.invalid) {
            return
        }

        this.isLoading = true
        this.errorMessage = ''

        const registerData: RegisterUserDto = this.registerForm.value

        this.authService.register(registerData).subscribe({
            next: () => {
                this.isLoading = false
                // Navigate to home or dashboard after successful registration
                this.router.navigate(['/'])
            },
            error: (error) => {
                this.isLoading = false
                this.errorMessage =
                    error.error?.message ||
                    'Registration failed. Please try again.'
            }
        })
    }
}
