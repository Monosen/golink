import { Component, Input } from '@angular/core'

@Component({
    selector: 'app-link',
    imports: [],
    templateUrl: './link.component.html'
})
export class LinkComponent {
    @Input() name: string = ''
    @Input() target: '_blank' | '_self' = '_self'
    @Input() variant: 'primary' | 'secondary' | 'outline' | 'tertiary' =
        'primary'
    @Input() customClass?: string

    getClasses(): string {
        const baseClasses =
            'flex items-center space-x-1 md:space-x-2 rounded-3xl px-3.5 py-2 capitalize cursor-pointer hover:opacity-70 transition-opacity duration-300'

        const variantClasses = {
            primary: 'border border-blue-600 bg-blue-600 text-white',
            secondary: 'border border-black bg-[#19191C] text-white',
            tertiary: 'border border-white bg-transparent text-white',

            outline:
                'border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
        }

        return `${baseClasses} ${variantClasses[this.variant]} ${this.customClass || ''}`
    }
}
