import { Component } from '@angular/core'
import { InputComponent } from '../ui/input/input.component'
import { ButtonComponent } from '../ui/button/button.component'
import { AuthService, LoginUserDto } from '../../pages/auth/auth.service'
import {
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login-form',
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  standalone: true,
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
      control => Validators.required(control),
      control => Validators.email(control),
    ])
    this.password = new FormControl('', [
      control => Validators.required(control),
      Validators.minLength(6),
    ])
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
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

    this.authService.login(this.loginForm.value as LoginUserDto).subscribe({
      next: () => {
        this.isLoading = false
        // Navigate to home or dashboard after successful login
        void this.router.navigate(['/dash'])
      },
      error: (error: { error?: { message?: string } }) => {
        this.isLoading = false
        this.errorMessage =
          error.error?.message || 'Login failed. Please try again.'
      },
    })
  }
}
