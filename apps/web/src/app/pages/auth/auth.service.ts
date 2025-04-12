import { inject, Injectable } from '@angular/core'
import { BehaviorSubject, lastValueFrom, Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map, catchError, tap, shareReplay } from 'rxjs/operators'
import { Router } from '@angular/router'

export interface LocalUser {
    id: string
    email: string
    name?: string
}

export interface LoginResponse {
    user: LocalUser
    token: string
}

export interface LoginUserDto {
    email: string
    password: string
}

export interface RegisterUserDto extends LoginUserDto {
    name: string
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private userSubject = new BehaviorSubject<LocalUser | null>(null)
    public user$ = this.userSubject.asObservable()
    private apiUrl = 'http://localhost:3000/api' // Adjust this URL to match your API endpoint
    private isLoggedIn = false // Simula el estado de inicio de sesión
    private router = inject(Router)

    constructor(private http: HttpClient) {
        // Intentar cargar el usuario del localStorage al iniciar
        const savedUser = localStorage.getItem('user')
        if (savedUser) {
            this.userSubject.next(JSON.parse(savedUser))
        }
    }

    login(loginData: LoginUserDto): Observable<LoginResponse> {
        return this.http
            .post<LoginResponse>(`${this.apiUrl}/auth/login`, loginData)
            .pipe(
                tap((response: LoginResponse) => {
                    if (response && response.token) {
                        localStorage.setItem('auth_token', response.token)
                        this.setUser(response.user)
                    }
                })
            )
    }

    register(registerData: RegisterUserDto): Observable<LoginResponse> {
        return this.http
            .post<LoginResponse>(`${this.apiUrl}/auth/register`, registerData)
            .pipe(
                tap((response: LoginResponse) => {
                    if (response && response.token) {
                        localStorage.setItem('auth_token', response.token)
                        this.setUser(response.user)
                    }
                })
            )
    }

    setUser(user: LocalUser) {
        this.userSubject.next(user)
        localStorage.setItem('user', JSON.stringify(user))
    }

    getUser(): LocalUser | null {
        return this.userSubject.value
    }

    getIsLoggedIn(): boolean {
        return this.isLoggedIn
    }

    logout() {
        localStorage.removeItem('user')
        localStorage.removeItem('auth_token')
        this.userSubject.next(null)
        this.router.navigate(['/'])
    }

    isAuthenticated(): Observable<boolean> {
        const authToken = localStorage.getItem('auth_token')

        if (!authToken) {
            console.log('No hay token de autenticación')
            return of(false)
        }

        const headers = new HttpHeaders({
            Authorization: `Bearer ${authToken}`
        })

        return this.http
            .get<{ message: string }>(`${this.apiUrl}/auth/check-auth`, {
                headers
            })
            .pipe(
                map((response: { message: string }) => {
                    const isAuthenticated = !!response?.message
                    this.isLoggedIn = isAuthenticated
                    return isAuthenticated
                }),
                catchError((_) => {
                    localStorage.removeItem('auth_token')
                    this.isLoggedIn = false
                    return of(false)
                }),
                shareReplay(1) // Comparte la última respuesta
            )
    }

    exchangeCodeForToken(code: string) {
        return this.http
            .post<LoginResponse>(`${this.apiUrl}/auth/github`, { code })
            .pipe(
                tap((response: LoginResponse) => {
                    if (response && response.token) {
                        // Guardar el token y el usuario en el cliente
                        localStorage.setItem('auth_token', response.token)
                        this.setUser(response.user)
                    }
                }),
                catchError((error) => {
                    console.error(
                        'Error al intercambiar el código por un token:',
                        error
                    )
                    throw error
                })
            )
    }
}
