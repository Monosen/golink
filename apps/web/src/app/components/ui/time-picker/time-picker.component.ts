import {
  Component,
  forwardRef,
  Input,
  HostListener,
  ElementRef,
} from '@angular/core'
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormsModule,
} from '@angular/forms'

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  standalone: true,
  imports: [FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimePickerComponent),
      multi: true,
    },
  ],
})
export class TimePickerComponent implements ControlValueAccessor {
  @Input() step: number = 5

  isOpen = false
  displayValue = ''
  selectedHour = 0
  selectedMinute = 0

  hours = Array.from({ length: 24 }, (_, i) => i)
  minutes = Array.from({ length: 60 / this.step }, (_, i) => i * this.step)

  private onChange: (value: string) => void = () => undefined
  private onTouched: () => void = () => undefined

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    const target = event.target as HTMLElement
    if (
      target &&
      !(this.elementRef.nativeElement as HTMLElement).contains(target) &&
      !target.closest('.clock-icon')
    ) {
      this.isOpen = false
    }
  }

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement
    const value = input.value

    // Validar formato HH:mm
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/
    if (timeRegex.test(value)) {
      const [hours, minutes] = value.split(':').map(Number)
      this.selectedHour = hours
      this.selectedMinute = minutes
      this.updateDisplayValue()
    }
  }

  writeValue(value: string): void {
    if (value) {
      const [hours, minutes] = value.split(':').map(Number)
      this.selectedHour = hours
      this.selectedMinute = minutes
      this.updateDisplayValue()
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn as (value: string) => void
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  togglePicker(): void {
    this.isOpen = !this.isOpen
  }

  selectHour(hour: number): void {
    this.selectedHour = hour
    this.updateDisplayValue()
  }

  selectMinute(minute: number): void {
    this.selectedMinute = minute
    this.updateDisplayValue()
  }

  private updateDisplayValue(): void {
    this.displayValue = `${this.selectedHour.toString().padStart(2, '0')}:${this.selectedMinute.toString().padStart(2, '0')}`
    this.onChange(this.displayValue)
    this.onTouched()
  }
}
