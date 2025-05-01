import { Component } from '@angular/core'
import { InputComponent } from '../ui/input/input.component'
import { ButtonComponent } from '../ui/button/button.component'
import { AuthService, RegisterUserDto } from '../../pages/auth/auth.service'
import {
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms'
import { Router } from '@angular/router'

@Component({
  selector: 'app-register-form',
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  standalone: true,
})
export class RegisterFormComponent {
  name: FormControl
  email: FormControl
  password: FormControl

  registerForm: FormGroup
  errorMessage: string = ''
  isLoading: boolean = false

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.name = new FormControl('', [control => Validators.required(control)])
    this.email = new FormControl('', [
      control => Validators.required(control),
      control => Validators.email(control),
    ])
    this.password = new FormControl('', [
      control => Validators.required(control),
      () => Validators.minLength(6),
    ])
    this.registerForm = new FormGroup({
      name: this.name,
      email: this.email,
      password: this.password,
    })
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return
    }

    this.isLoading = true
    this.errorMessage = ''

    this.authService
      .register(this.registerForm.value as RegisterUserDto)
      .subscribe({
        next: () => {
          this.isLoading = false
          // Navigate to home or dashboard after successful registration
          void this.router.navigate(['/dash'])
        },
        error: (error: { error?: { message?: string } }) => {
          this.isLoading = false
          this.errorMessage =
            error.error?.message || 'Registration failed. Please try again.'
        },
      })
  }
}
