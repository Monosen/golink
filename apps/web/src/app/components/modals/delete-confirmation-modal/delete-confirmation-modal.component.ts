import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-delete-confirmation-modal',
  imports: [],
  templateUrl: './delete-confirmation-modal.component.html',
})
export class DeleteConfirmationModalComponent {
  @Input()
  message: string = ''

  @Input()
  confirmButtonText: string = ''

  @Input()
  cancelButtonText: string = ''

  @Input()
  onConfirm: () => void = () => {}

  @Input()
  onCancel: () => void = () => {}
}
