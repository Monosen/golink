import { Component } from '@angular/core'
import { ShuffleIconComponent } from '../../../assets/icons/shuffle-icon/shuffle-icon.component'
import { CreateLinkService } from '../../../services/modals/create-link.service'
import {
    FormBuilder,
    FormGroup,
    Validators,
    ReactiveFormsModule
} from '@angular/forms'
import {
    CreateShortUrlDto,
    ShortLinkService
} from '../../../services/short-link.service'
import { ButtonComponent } from '../../ui/button/button.component'
import { LinkComponent } from '../../ui/link/link.component'
import { InputComponent } from '../../ui/input/input.component'
import { TimePickerComponent } from '../../ui/time-picker/time-picker.component'

@Component({
    selector: 'app-create-new-link',
    standalone: true,
    imports: [
        ShuffleIconComponent,
        ButtonComponent,
        ReactiveFormsModule,
        LinkComponent,
        InputComponent,
        TimePickerComponent
    ],
    templateUrl: './create-new-link.component.html'
})
export class CreateNewLinkComponent {
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
            startDate: [''],
            startTime: [''],
            endDate: [''],
            endTime: [''],
            clickLimit: [
                '',
                [Validators.min(1), Validators.pattern('^[0-9]*$')]
            ]
        })
    }

    toggleDateType(type: 'custom' | 'none') {
        this.isCustomDate = type === 'custom'
        if (!this.isCustomDate) {
            this.createNewLinkForm.patchValue({
                startDate: '',
                endDate: ''
            })
        }
    }

    toggleClickType(type: 'custom' | 'none') {
        this.isCustomClick = type === 'custom'
        if (!this.isCustomClick) {
            this.createNewLinkForm.patchValue({
                clickLimit: ''
            })
        }
    }

    closeModal(): void {
        this.createLinkService.closeModal()
    }

    onSubmit() {
        if (this.createNewLinkForm.invalid) {
            return
        }

        this.isLoading = true
        this.errorMessage = ''

        const createShortUrl: CreateShortUrlDto = this.createNewLinkForm.value

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
}
