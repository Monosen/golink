import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-date-info-modal',
  standalone: true,
  imports: [],
  templateUrl: './date-info-modal.component.html',
})
export class DateInfoModalComponent {
  @Input() startDate: Date | null = null
  @Input() endDate: Date | null = null

  getFormattedDate(date: Date | null): string {
    if (!date) return ''
    const newDate = new Date(date)
    return newDate.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }

  getFormattedTime(date: Date | null): string {
    if (!date) return ''
    const newDate = new Date(date)
    return newDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }
}
