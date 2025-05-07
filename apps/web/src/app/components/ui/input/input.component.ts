import {
  Component,
  ElementRef,
  Input,
  Renderer2,
  forwardRef,
} from '@angular/core'
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './input.component.html',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() placeholder: string = 'text'
  @Input() type: string = 'text'

  private value: any = ''
  private disabled: boolean = false
  private onChange: (value: any) => void = () => {}
  private onTouched: () => void = () => {}

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {}

  writeValue(value: any): void {
    this.value = value
    this.renderer.setProperty(
      this.elementRef.nativeElement.querySelector('input'),
      'value',
      value
    )
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
    this.renderer.setProperty(
      this.elementRef.nativeElement.querySelector('input'),
      'disabled',
      isDisabled
    )
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value
    this.value = value
    this.onChange(value)
    this.onTouched()
  }
}
