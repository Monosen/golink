import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map, catchError, tap, shareReplay } from 'rxjs/operators'

export interface GithubUser {
    login: string
    id: number
    avatar_url: string
    name: string
    email: string
    bio: string
    public_repos: number
    followers: number
    following: number
}

export interface LocalUser {
    id: string
    username: string
    email: string
    avatarUrl?: string
    name?: string
    role: string
}

export interface LoginResponse {
    user: LocalUser
    token: string
}

export interface RegisterUserDto {
    name: string
    email: string
    password: string
}

export interface LoginUserDto {
    email: string
    password: string
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private userSubject = new BehaviorSubject<LocalUser | null>(null)
    public user$ = this.userSubject.asObservable()
    private apiUrl = 'http://localhost:3000/api' // Adjust this URL to match your API endpoint
    private isLoggedIn = false // Simula el estado de inicio de sesión

    constructor(private http: HttpClient) {
        // Intentar cargar el usuario del localStorage al iniciar
        const savedUser = localStorage.getItem('user')
        if (savedUser) {
            this.userSubject.next(JSON.parse(savedUser))
        }
    }

    async handleGithubUser(githubUser: GithubUser): Promise<void> {
        try {
            // Enviar los datos de GitHub a tu backend para crear/actualizar el usuario
            const response = await this.http
                .post<LoginResponse>('/api/auth/github-callback', {
                    githubId: githubUser.id,
                    email: githubUser.email,
                    username: githubUser.login,
                    name: githubUser.name,
                    avatarUrl: githubUser.avatar_url,
                    bio: githubUser.bio
                })
                .toPromise()

            if (response && response.user && response.token) {
                // Guardar el token JWT en localStorage
                localStorage.setItem('auth_token', response.token)

                // Actualizar el usuario en el estado
                this.setUser(response.user)
            }
        } catch (error) {
            console.error('Error al procesar usuario de GitHub:', error)
            throw error
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
}
