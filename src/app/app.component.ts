import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  darkMode = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const theme = localStorage.getItem('IsDarkMode');
      this.darkMode = theme === 'true';
      this.toggleDarkMode(this.darkMode);
    }
  }

  switchTheme() {
    this.darkMode = !this.darkMode;
    this.toggleDarkMode(this.darkMode);
  }

  toggleDarkMode(themeMode: boolean) {
    localStorage.setItem('IsDarkMode', themeMode.toString());
    themeMode === true
      ? document.body.classList.add('dark')
      : document.body.classList.remove('dark');
  }
}
