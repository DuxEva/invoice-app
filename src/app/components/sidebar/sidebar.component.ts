import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  darkMode = false;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.applyThemePreference();
    }
  }

  applyThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    if (
      savedTheme === 'dark' ||
      (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      this.darkMode = true;
      this.updateDarkModeClass(true);
    } else {
      this.darkMode = false;
      this.updateDarkModeClass(false);
    }
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    localStorage.setItem('theme', this.darkMode ? 'dark' : 'light');
    this.updateDarkModeClass(this.darkMode);
  }

  private updateDarkModeClass(isDarkMode: boolean) {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
