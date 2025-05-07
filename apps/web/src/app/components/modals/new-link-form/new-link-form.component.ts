import { Component, Input, OnInit } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms'
import {
  CreateShortUrlDto,
  ShortLinkService,
} from '../../../services/short-link.service'
import { InputComponent } from '../../ui/input/input.component'
import { TimePickerComponent } from '../../ui/time-picker/time-picker.component'
import { ButtonComponent } from '../../ui/button/button.component'
import { ModalService } from '../../../services/modals/modal.service'

@Component({
  selector: 'app-new-link-form',
  imports: [
    InputComponent,
    TimePickerComponent,
    ButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './new-link-form.component.html',
})
export class NewLinkFormComponent implements OnInit {
  @Input() isEditMode: boolean = false
  @Input() id: number = 0
  @Input() initialData: any = null

  createNewLinkForm: FormGroup
  errorMessage: string = ''
  isLoading: boolean = false
  isCustomDate: boolean = false
  isCustomClick: boolean = false

  constructor(
    private modalService: ModalService,
    private fb: FormBuilder,
    private readonly shortLinkService: ShortLinkService
  ) {
    this.createNewLinkForm = this.fb.group(
      {
        longUrl: ['', [Validators.required]],
        shortCode: [
          '',
          [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')],
        ],
        startDate: [null],
        startTime: [null],
        endDate: [null],
        endTime: [null],
        clickLimit: [null, [Validators.min(1), Validators.pattern('^[0-9]*$')]],
      },
      {
        validators: [
          this.dateValidator(),
          this.timeValidator(),
          this.startEndDateValidator(),
        ],
      }
    )
  }

  ngOnInit() {
    if (this.isEditMode && this.initialData) {
      this.createNewLinkForm.patchValue({
        longUrl: this.initialData.longUrl,
        shortCode: this.initialData.shortCode,
        clickLimit: this.initialData.clickLimit,
      })

      if (this.initialData.startDate) {
        const startDate = new Date(this.initialData.startDate)
        this.createNewLinkForm.patchValue({
          startDate: startDate.toISOString().split('T')[0],
          startTime: startDate.toTimeString().slice(0, 5),
        })
        this.isCustomDate = true
      }

      if (this.initialData.endDate) {
        const endDate = new Date(this.initialData.endDate)
        this.createNewLinkForm.patchValue({
          endDate: endDate.toISOString().split('T')[0],
          endTime: endDate.toTimeString().slice(0, 5),
        })
        this.isCustomDate = true
      }

      if (this.initialData.clickLimit) {
        this.isCustomClick = true
      }
    }
  }

  // Validador personalizado para validar que si hay una fecha, debe haber una hora y viceversa
  dateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!this.isCustomDate) {
        return null
      }

      const startDate = control.get('startDate')?.value
      const startTime = control.get('startTime')?.value
      const endDate = control.get('endDate')?.value
      const endTime = control.get('endTime')?.value

      // Si hay fecha de inicio pero no hora de inicio
      if (startDate && !startTime) {
        return { startTimeRequired: true }
      }

      // Si hay hora de inicio pero no fecha de inicio
      if (startTime && !startDate) {
        return { startDateRequired: true }
      }

      // Si hay fecha de fin pero no hora de fin
      if (endDate && !endTime) {
        return { endTimeRequired: true }
      }

      // Si hay hora de fin pero no fecha de fin
      if (endTime && !endDate) {
        return { endDateRequired: true }
      }

      // Al menos una fecha debe estar presente cuando isCustomDate es true
      if (this.isCustomDate && !startDate && !endDate) {
        return { atLeastOneDateRequired: true }
      }

      return null
    }
  }

  // Validador para asegurar que las horas tengan formato correcto
  timeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!this.isCustomDate) {
        return null
      }

      const startTime = control.get('startTime')?.value
      const endTime = control.get('endTime')?.value

      // Verificar que la hora tenga el formato correcto (HH:MM)
      const timePattern = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/

      if (startTime && !timePattern.test(startTime)) {
        return { invalidStartTime: true }
      }

      if (endTime && !timePattern.test(endTime)) {
        return { invalidEndTime: true }
      }

      return null
    }
  }

  // Validador para asegurar que la fecha de inicio sea anterior a la fecha de fin
  startEndDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!this.isCustomDate) {
        return null
      }

      const startDate = control.get('startDate')?.value
      const startTime = control.get('startTime')?.value
      const endDate = control.get('endDate')?.value
      const endTime = control.get('endTime')?.value

      // Si no están ambas fechas y horas completas, no validamos
      if (!startDate || !startTime || !endDate || !endTime) {
        return null
      }

      const startDateTime = new Date(`${startDate}T${startTime}`)
      const endDateTime = new Date(`${endDate}T${endTime}`)

      // Verificar que startDateTime sea anterior a endDateTime
      if (startDateTime >= endDateTime) {
        return { endDateBeforeStart: true }
      }

      // Verificar que la fecha de inicio no sea en el pasado
      const now = new Date()
      if (startDateTime < now) {
        return { startDateInPast: true }
      }

      return null
    }
  }

  // Método para obtener mensajes de error específicos para mostrar en la UI
  getErrorMessage(): string {
    const form = this.createNewLinkForm

    if (form.hasError('startTimeRequired')) {
      return 'La hora de inicio es requerida cuando se especifica la fecha'
    }

    if (form.hasError('startDateRequired')) {
      return 'La fecha de inicio es requerida cuando se especifica la hora'
    }

    if (form.hasError('endTimeRequired')) {
      return 'La hora de fin es requerida cuando se especifica la fecha'
    }

    if (form.hasError('endDateRequired')) {
      return 'La fecha de fin es requerida cuando se especifica la hora'
    }

    if (form.hasError('atLeastOneDateRequired')) {
      return 'Debe especificar al menos una fecha cuando la fecha personalizada está activa'
    }

    if (form.hasError('invalidStartTime')) {
      return 'El formato de hora de inicio es inválido (HH:MM)'
    }

    if (form.hasError('invalidEndTime')) {
      return 'El formato de hora de fin es inválido (HH:MM)'
    }

    if (form.hasError('endDateBeforeStart')) {
      return 'La fecha de fin debe ser posterior a la fecha de inicio'
    }

    if (form.hasError('startDateInPast')) {
      return 'La fecha de inicio no puede ser en el pasado'
    }

    return ''
  }

  toggleDateType(type: 'custom' | 'none') {
    this.isCustomDate = type === 'custom'
    if (!this.isCustomDate) {
      this.createNewLinkForm.patchValue({
        startDate: null,
        startTime: null,
        endDate: null,
        endTime: null,
      })
    }
    // Forzar re-validación cuando cambia el tipo de fecha
    this.createNewLinkForm.updateValueAndValidity()
  }

  toggleClickType(type: 'custom' | 'none') {
    this.isCustomClick = type === 'custom'
    if (!this.isCustomClick) {
      this.createNewLinkForm.patchValue({
        clickLimit: null,
      })
    }
  }

  isButtonDisabled(): boolean {
    // El formulario debe ser válido para estar habilitado
    if (this.createNewLinkForm.invalid) {
      return true
    }

    // Los campos básicos deben estar completos
    if (
      !this.createNewLinkForm.get('longUrl')?.value ||
      !this.createNewLinkForm.get('shortCode')?.value
    ) {
      return true
    }

    // Verificar campos de fecha si isCustomDate está activo
    if (this.isCustomDate) {
      const startDate = this.createNewLinkForm.get('startDate')?.value
      const startTime = this.createNewLinkForm.get('startTime')?.value
      const endDate = this.createNewLinkForm.get('endDate')?.value
      const endTime = this.createNewLinkForm.get('endTime')?.value

      // Debe tener al menos un par fecha/hora completo
      const hasStartDateTime = startDate && startTime
      const hasEndDateTime = endDate && endTime

      if (!hasStartDateTime && !hasEndDateTime) {
        return true
      }
    }

    // Verificar campo de clicks si isCustomClick está activo
    if (this.isCustomClick) {
      const clickLimit = this.createNewLinkForm.get('clickLimit')?.value
      if (!clickLimit || isNaN(clickLimit) || clickLimit < 1) {
        return true
      }
    }

    return false
  }

  onSubmit() {
    if (this.createNewLinkForm.invalid) {
      this.markFormGroupTouched(this.createNewLinkForm)
      return
    }

    this.isLoading = true
    this.errorMessage = ''

    const formValue = this.createNewLinkForm.value
    const shortUrlData: CreateShortUrlDto = {
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
      clickLimit: formValue.clickLimit || null,
    }

    if (this.isEditMode) {
      this.shortLinkService.updateShortUrl(this.id, shortUrlData).subscribe({
        next: () => {
          this.isLoading = false
          this.modalService.closeModal()
          this.createNewLinkForm.reset()
          this.shortLinkService.getAllShortUrls().subscribe()
        },
        error: error => {
          this.isLoading = false
          this.errorMessage =
            error.error?.message ||
            'Error al actualizar el enlace. Por favor, intente de nuevo.'
        },
      })
    } else {
      this.shortLinkService.createShortUrl(shortUrlData).subscribe({
        next: () => {
          this.isLoading = false
          this.modalService.closeModal()
          this.createNewLinkForm.reset()
          this.shortLinkService.getAllShortUrls().subscribe()
        },
        error: error => {
          this.isLoading = false
          this.errorMessage =
            error.error?.message ||
            'Error al crear el enlace. Por favor, intente de nuevo.'
        },
      })
    }
  }

  // Método auxiliar para marcar todos los campos como tocados
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched()
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control)
      }
    })
  }

  getRandomCode() {
    this.shortLinkService.getRandomCode().subscribe({
      next: ({ randomCode }: { randomCode: string }) => {
        this.createNewLinkForm.patchValue({ shortCode: randomCode })
      },
      error: err => {
        console.error('Failed to fetch random code:', err)
      },
    })
  }
}
