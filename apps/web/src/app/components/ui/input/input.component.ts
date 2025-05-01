import {
  Component,
  ElementRef,
  Input,
  Renderer2,
  forwardRef,
} from '@angular/core'
import {
  ControlValueAccessor,
  DefaultValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
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
export class InputComponent
  extends DefaultValueAccessor
  implements ControlValueAccessor
{
  @Input() placeholder: string = 'text'
  @Input() type: string = 'text'

  constructor(renderer: Renderer2, elementRef: ElementRef) {
    super(renderer, elementRef, false)
  }
}
