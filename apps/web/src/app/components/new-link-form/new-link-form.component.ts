import { Component } from '@angular/core'
import { CreateLinkService } from '../../services/modals/create-link.service'
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators
} from '@angular/forms'
import {
    CreateShortUrlDto,
    ShortLinkService
} from '../../services/short-link.service'
import { InputComponent } from '../ui/input/input.component'
import { ShuffleIconComponent } from '../../assets/icons/shuffle-icon/shuffle-icon.component'
import { TimePickerComponent } from '../ui/time-picker/time-picker.component'
import { ButtonComponent } from '../ui/button/button.component'

@Component({
    selector: 'app-new-link-form',
    imports: [
        InputComponent,
        ShuffleIconComponent,
        TimePickerComponent,
        ButtonComponent,
        ReactiveFormsModule
    ],
    templateUrl: './new-link-form.component.html'
})
export class NewLinkFormComponent {
    createNewLinkForm: FormGroup
    errorMessage: string = ''
    isLoading: boolean = false
    isCustomDate: boolean = false
    isCustomClick: boolean = false

    constructor(
        private createLinkService: CreateLinkService,
        private fb: FormBuilder,
        private readonly shortLinkService: ShortLinkService
    ) {
        this.createNewLinkForm = this.fb.group({
            longUrl: ['', [Validators.required]],
            shortCode: [
                '',
                [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]
            ],
            startDate: [null],
            startTime: [null],
            endDate: [null],
            endTime: [null],
            clickLimit: [
                null,
                [Validators.min(1), Validators.pattern('^[0-9]*$')]
            ]
        })
    }

    toggleDateType(type: 'custom' | 'none') {
        this.isCustomDate = type === 'custom'
        if (!this.isCustomDate) {
            this.createNewLinkForm.patchValue({
                startDate: null,
                startTime: null,
                endDate: null,
                endTime: null
            })
        }
    }

    toggleClickType(type: 'custom' | 'none') {
        this.isCustomClick = type === 'custom'
        if (!this.isCustomClick) {
            this.createNewLinkForm.patchValue({
                clickLimit: null
            })
        }
    }

    onSubmit() {
        if (this.createNewLinkForm.invalid) {
            return
        }

        this.isLoading = true
        this.errorMessage = ''

        const formValue = this.createNewLinkForm.value
        const createShortUrl: CreateShortUrlDto = {
            longUrl: formValue.longUrl,
            shortCode: formValue.shortCode,
            startDate:
                formValue.startDate && formValue.startTime
                    ? new Date(`${formValue.startDate}T${formValue.startTime}`)
                    : null,
            endDate:
                formValue.endDate && formValue.endTime
                    ? new Date(`${formValue.endDate}T${formValue.endTime}`)
                    : null,
            clickLimit: formValue.clickLimit || null
        }

        this.shortLinkService.createShortUrl(createShortUrl).subscribe({
            next: () => {
                this.isLoading = false
                this.closeModal()
                this.createNewLinkForm.reset()

                // Actualizar la lista de URLs cortas
                this.shortLinkService.getAllShortUrls().subscribe()
            },
            error: (error) => {
                this.isLoading = false
                this.errorMessage =
                    error.error?.message ||
                    'Registration failed. Please try again.'
            }
        })
    }

    closeModal(): void {
        this.createLinkService.closeModal()
    }

    getRandomCode() {
        this.shortLinkService.getRandomCode().subscribe({
            next: ({ randomCode }: { randomCode: string }) => {
                this.createNewLinkForm.patchValue({ shortCode: randomCode })
            },
            error: (err) => {
                console.error('Failed to fetch random code:', err)
            }
        })
    }
}
