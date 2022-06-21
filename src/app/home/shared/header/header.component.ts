import { Component, ElementRef, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  toggleMenu: boolean = false;

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!this._eRef.nativeElement.contains(event.target)) {
      this.toggleMenu = false;
    }
  }
  constructor(private _eRef: ElementRef) {}

  ngOnInit(): void {}
}
