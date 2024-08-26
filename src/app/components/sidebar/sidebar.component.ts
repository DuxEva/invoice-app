import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  @Output() theme = new EventEmitter();
  @Input() isDarkMode = true;

  toggleTheme() {
    this.theme.emit();
  }
}
