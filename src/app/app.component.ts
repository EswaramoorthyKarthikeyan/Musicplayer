import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'musicplayer';
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrollToTop = window.scrollY > innerHeight ? true : false;
  }

  scrollToTop: boolean = false;

  scrolltop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
