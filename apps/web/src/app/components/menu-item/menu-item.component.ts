import { Component, Input, HostBinding } from '@angular/core'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  standalone: true,
  imports: [RouterModule],
})
export class MenuItemComponent {
  @Input() label: string = ''
  @Input() href?: string
  @Input() target: string = '_self'
  @Input() routerLink?: string | any[]
  @Input() queryParams?: { [key: string]: any }
  @Input() active: boolean = false
  @Input() disabled: boolean = false
  @Input() iconHtml?: string // Acepta contenido HTML para el ícono

  // CSS classes
  @Input() customClass: string = ''
  @Input() activeClass: string = 'bg-gray-100 text-gray-900'

  @HostBinding('class') get hostClass() {
    return this.disabled ? 'opacity-50 pointer-events-none' : ''
  }

  get menuItemClass(): string {
    const baseClasses =
      'flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-300'
    const hoverClasses = this.disabled
      ? ''
      : 'hover:bg-black hover:bg-opacity-10'
    const activeClasses = this.active ? this.activeClass : ''
    const customClasses = this.customClass || ''

    return `${baseClasses} ${hoverClasses} ${activeClasses} ${customClasses}`.trim()
  }

  isExternalLink(): boolean {
    return (
      !!this.href &&
      (this.href.startsWith('http') || this.href.startsWith('//'))
    )
  }
}
