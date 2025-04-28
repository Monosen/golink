import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, BehaviorSubject } from 'rxjs'
import { tap } from 'rxjs/operators'
import { environment } from '../../environments/environment.development'

export interface ShortUrl {
    id: number
    shortCode: string
    longUrl: string
    clickCount: number
    clickLimit: number | null
    createdAt: string
}

export interface CreateShortUrlDto {
    longUrl: string
    shortCode: string
    startDate?: Date | null
    endDate?: Date | null
    clickLimit?: number | null
}

export interface UpdateShortUrlDto {
    shortCode?: string
    longUrl?: string
}

@Injectable({
    providedIn: 'root'
})
export class ShortLinkService {
    private apiUrl = `${environment.apiUrl}/short-url`
    private shortUrlsSubject = new BehaviorSubject<ShortUrl[]>([])
    shortUrls$ = this.shortUrlsSubject.asObservable() // Exponer como observable

    constructor(private http: HttpClient) {}

    // Crear una nueva URL corta
    createShortUrl(data: CreateShortUrlDto): Observable<ShortUrl> {
        return this.http.post<ShortUrl>(`${this.apiUrl}/create`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('auth_token')}`
            }
        })
    }

    // Obtener todas las URLs cortas y actualizar el BehaviorSubject
    getAllShortUrls(): Observable<ShortUrl[]> {
        return this.http
            .get<ShortUrl[]>(`${this.apiUrl}/all`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('auth_token')}`
                }
            })
            .pipe(
                tap((shortUrls) => this.shortUrlsSubject.next(shortUrls)) // Actualizar el BehaviorSubject
            )
    }

    // Obtener una URL corta por su ID
    getShortUrlById(id: number): Observable<ShortUrl> {
        return this.http.get<ShortUrl>(`${this.apiUrl}/one/${id}`)
    }

    // Actualizar una URL corta por su ID
    updateShortUrl(id: number, data: UpdateShortUrlDto): Observable<ShortUrl> {
        return this.http.put<ShortUrl>(`${this.apiUrl}/update/${id}`, data)
    }

    // Eliminar una URL corta y actualizar la lista
    deleteShortUrl(id: number): Observable<void> {
        return this.http
            .delete<void>(`${this.apiUrl}/remove/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('auth_token')}`
                }
            })
            .pipe(
                tap(() => {
                    // Actualizar la lista después de eliminar
                    const updatedShortUrls = this.shortUrlsSubject.value.filter(
                        (url) => url.id !== id
                    )
                    this.shortUrlsSubject.next(updatedShortUrls)
                })
            )
    }

    // Obtener la URL larga a partir del código corto
    getLongUrl(shortCode: string): Observable<{ longUrl: string }> {
        return this.http.get<{ longUrl: string }>(`${this.apiUrl}/${shortCode}`)
    }

    getRandomCode(): Observable<{ randomCode: string }> {
        return this.http.get<{ randomCode: string }>(`${this.apiUrl}/random`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('auth_token')}`
            }
        })
    }
}
