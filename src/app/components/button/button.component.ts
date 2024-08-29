import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() text: string = 'Get started';
  @Input() backgroundColor: string = 'bg-green';
  @Input() textColor: string = 'text-white';
  @Input() width: string = 'w-auto';
  @Input() borderRadius: string = 'rounded-md';
  @Input() icon?: string;
}
